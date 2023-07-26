const { getQuestionById } = require("../utils/external.service");
const { getTeamById } = require("../utils/external.service");
const { getUserById } = require("../utils/external.service");
const { updateUserScore } = require("../utils/external.service");
const { updateTeamScore } = require("../utils/external.service");


module.exports.realTimeScore = async (event) => {
    let question = null;
    let team = null;
    try {
        // questions = await getQuestions();
        question=await getQuestionById(event.pathParameters.questionId);
        // const question = questions.find(q => q.questionId === event.pathParameters.questionId);
        if (!question) throw new Error('Question not found');
        let body = JSON.parse(event.body);
        team = await getTeamById(body.teamId);
       
        let newScore = Number(team.pointsEarned);

        if (body.answer === question.correctAnswer) {
            newScore += Number(question.points);
            // newScore += question.points;

            for (let member of team.members) {
                user = await getUserById(member.userId);
               
                user.totalPoints += Number(question.points);
                let data = {
                    totalGamePlayed: 0,
                    win: 0,
                    loss: 0,
                    totalPoints: user.totalPoints,
                    achievements: ""
                };

                console.log("team line 38:", member.userId);
                const userUpdatedData = await updateUserScore(member.userId, data);
                console.log("team line 40:", userUpdatedData);
            }
            let data = { pointsEarned: newScore }
            const teamUpdatedData = await updateTeamScore(team.id, data);
            console.log("team line 45:", teamUpdatedData);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Answer processed',
                teamName: team.name,
                newTeamScore: team.pointsEarned,
                members: team.members.map(member => ({
                    userId: member.userId,
                    // newScore: member.individualScores
                }))
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal Server Error. Not Able to fetch Real Time Score !!',
                error: error.message
            })
        };
    }
};
