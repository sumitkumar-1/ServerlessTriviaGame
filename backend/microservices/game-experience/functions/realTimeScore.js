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
        question = await getQuestionById(event.pathParameters.questionId);
        // const question = questions.find(q => q.questionId === event.pathParameters.questionId);
        if (!question) throw new Error('Question not found');
        let body = JSON.parse(event.body);
        team = await getTeamById(body.teamId);
        let pointsToAdd = Number(question.points);
        let newScore = Number(team.pointsEarned);

        if (body.answer === question.correctAnswer && !isNaN(pointsToAdd)) {

            newScore += pointsToAdd;
            // newScore += question.points;

            for (let member of team.members) {
                let user = await getUserById(member.userId);

                // Ensure user.totalPoints is a number
                if (!user.totalPoints || isNaN(user.totalPoints)) {
                    user.totalPoints = 0;
                }

                user.totalPoints += pointsToAdd;
                let newUserScore=Number(user.totalPoints)


                let data = {
                    totalGamePlayed: 0,
                    win: 0,
                    loss: 0,
                    totalPoints: newUserScore,
                    achievements: ""
                };

                const userUpdatedData = await updateUserScore(member.userId, data);
            }

            let data = { pointsEarned: newScore }
            const teamUpdatedData = await updateTeamScore(team.id, data);

        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Answer processed',
                teamName: team.name,
                newTeamScore: team.pointsEarned,
                members: team.members.map(member => ({
                    userId: member.userId,
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
