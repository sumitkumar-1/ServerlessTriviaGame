const axios = require('axios')
module.exports.getTeams = async () => {
    try {
        const response = await axios.get('https://mjvsjlx9pa.execute-api.us-east-1.amazonaws.com/dev/api/teams/');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}