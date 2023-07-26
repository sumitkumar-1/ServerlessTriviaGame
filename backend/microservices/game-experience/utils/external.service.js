const axios = require('axios')

module.exports.getQuestions = async () => {
    try {
        const response = await axios.get('https://ns1ej9dzn0.execute-api.us-east-1.amazonaws.com/questions');
        return response.data;
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
        const response = await axios.get(`https://ns1ej9dzn0.execute-api.us-east-1.amazonaws.com/questions/${id}`);
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
        console.log(`https://mjvsjlx9pa.execute-api.us-east-1.amazonaws.com/dev/api/teams/updatestats/${id}`, data);
        const response = await axios.post(`https://mjvsjlx9pa.execute-api.us-east-1.amazonaws.com/dev/api/teams/updatestats/${id}`, data);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
