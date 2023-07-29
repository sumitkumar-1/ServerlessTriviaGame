const axios = require('axios')

module.exports.getQuestions = async (gameId) => {
    try {
       
        const response = await axios.get(`https://8ea7cy4wb9.execute-api.us-east-1.amazonaws.com/games/${gameId}`);
        return response.data.questions;
    } catch (error) {
        console.error(error);
    }
}

module.exports.getTeams = async () => {
    try {
        const response = await axios.get('https://mjvsjlx9pa.execute-api.us-east-1.amazonaws.com/dev/api/teams');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

module.exports.getUserById = async (id) => {
    try {
        const response = await axios.get(`https://vbruuow5aj.execute-api.us-east-1.amazonaws.com/getGamedataByUserId/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

module.exports.getTeamById = async (id) => {
    try {
      
        const response = await axios.get(`https://mjvsjlx9pa.execute-api.us-east-1.amazonaws.com/dev/api/teams/get/${id}`);
        
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// not working for now
module.exports.getQuestionById = async (id) => {
    try {
        const response = await axios.get(`https://8ea7cy4wb9.execute-api.us-east-1.amazonaws.com/questions/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


module.exports.updateUserScore = async (id, data) => {
    try {
        const response = await axios.post(`https://vbruuow5aj.execute-api.us-east-1.amazonaws.com/updateGameDataById/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

module.exports.updateTeamScore = async (id, data) => {
    try {
               const response = await axios.post(`https://mjvsjlx9pa.execute-api.us-east-1.amazonaws.com/dev/api/teams/updatestats/${id}`, data);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
