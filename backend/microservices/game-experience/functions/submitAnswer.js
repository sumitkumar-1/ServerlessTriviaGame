const axios = require('axios');
const { getQuestionById } = require("../utils/external.service");

// The submitAnswer function

exports.submitAnswer = async (event, context) => {
    let question = null;
    try {
        const { questionId } = event.pathParameters;
        // questions = await getQuestions();
        // const question = questions.find(q => q.questionId === questionId);
        question=await getQuestionById(questionId);
        
        if (!question) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Question not found' })
            };
        }

        const requestBody = JSON.parse(event.body);
        console.log(requestBody.answer);

        if (requestBody.answer === null) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'No answer selected',
                    isCorrect: false,
                    correctAnswer: question.correctAnswer,
                    explanation: question.explanation
                })
            };
        }

        const isCorrect = requestBody.answer === question.correctAnswer;
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: isCorrect ? 'Correct answer' : 'Incorrect answer',
                isCorrect: isCorrect,
                correctAnswer: question.correctAnswer,
                explanation: question.explanation
            })
        };

    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal Server Error. Failed to submit Answer !!',
                error: error
            })
        };
    }
};
