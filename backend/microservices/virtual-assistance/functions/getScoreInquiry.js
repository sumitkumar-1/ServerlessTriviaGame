// const { getTeams } = require("./services/external.service");

// exports.getScoreInquiry = async (event) => {
//     let teams = [];
//     console.log('Received event:', JSON.stringify(event, null, 2));

//     if (!event.sessionState || !event.sessionState.intent) {
//         console.error('Error: event.sessionState.intent is undefined');
//         return;
//     }

//     let teamName = event.sessionState.intent.slots.teamName.value.originalValue;
//     teams = await getTeams();
//     console.log(teams);
//     console.log('line 15',teamName);
//     const team = teams.find(t => t.name === teamName);

//     // Create the base response object
//     let response = {
//         "sessionState": {
//             "intent": {
//                 "name": event.sessionState.intent.name,
//                 "slots": event.sessionState.intent.slots,
//                 "confirmationState": "None"
//             },
//             "dialogAction": {
//                 "type": "Close"
//             },
//             "sessionAttributes": {}
//         },
//         "messages": [],
//         "requestAttributes": {}
//     };

//     // Modify the response based on whether the team exists
//     if (!team) {
//         console.log(`Team not found: ${teamName}`);
//         response.sessionState.intent.state = "Failed";
//         response.messages.push({
//             "contentType": "PlainText",
//             "content": `The team name you entered does not exist. Please enter a valid team name.`
//         });
//     } else {
//         console.log(`Team: ${JSON.stringify(team)}`);
//         response.sessionState.intent.state = "Fulfilled";
//         response.messages.push({
//             "contentType": "PlainText",
//             "content": `The score for team ${team.name} is ${team.pointsEarned}.`
//         });
//     }

//     return response;
// };
