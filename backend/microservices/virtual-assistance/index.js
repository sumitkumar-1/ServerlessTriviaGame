const { getTeams } = require("./services/external.service");

exports.lexFulfillment = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    if (!event.sessionState || !event.sessionState.intent) {
        console.error('Error: event.sessionState.intent is undefined');
        return;
    }

    // Create the base response object
    let response = {
        "sessionState": {
            "intent": {
                "name": event.sessionState.intent.name,
                "slots": event.sessionState.intent.slots,
                "confirmationState": "None"
            },
            "dialogAction": {
                "type": "Close"
            },
            "sessionAttributes": {}
        },
        "messages": [],
        "requestAttributes": {}
    };

    if (event.sessionState.intent.name === 'GetTeamScore') {
        let teamName = event.sessionState.intent.slots.teamName.value.originalValue;
        let teams = await getTeams();
        console.log(teams);
        console.log('line 15', teamName);
        const team = teams.find(t => t.name === teamName);

        // Modify the response based on whether the team exists
        if (!team) {
            console.log(`Team not found: ${teamName}`);
            response.sessionState.intent.state = "Failed";
            response.messages.push({
                "contentType": "PlainText",
                "content": `The team name you entered does not exist. Please enter a valid team name.`
            });
        } else {
            console.log(`Team: ${JSON.stringify(team)}`);
            response.sessionState.intent.state = "Fulfilled";
            response.messages.push({
                "contentType": "PlainText",
                "content": `The score for team ${team.name} is ${team.pointsEarned}.`
            });
        }
    } else if (event.sessionState.intent.name === 'GetNavigation') {
        let navigationFor = event.sessionState.intent.slots.navigationFor.value.originalValue;
        console.log(navigationFor);
        let navigationPath = '';

        // create a switch case on the basis of navigationFor value 
        switch(navigationFor.toLowerCase()) {
            case "game lobby":
            case "gamelobby":
                navigationPath = "Step 1: login first. Step 2: Click on 'Go to Games'. Step 3: Search for lobby based on your choice. Step 4: Enter the lobby.";
                break;
            case "game leaderboard":
                navigationPath = "Step 1: login first. Step 2: Click on 'Game Records'. Step 3: View game stats.";
                break;
            case "user profile":
            case "userprofile":
                navigationPath = "Step 1: login first. Step 2: Select the side view bar. Step 3: Click on 'User Profile'.";
                break;
            default:
                navigationPath = null;
        }

        // Modify the response based on whether the navigation path exists
        if (!navigationPath) {
            console.log(`Invalid navigation: ${navigationFor}`);
            response.sessionState.intent.state = "Failed";
            response.messages.push({
                "contentType": "PlainText",
                "content": `Navigation does not exist for this.`
            });
        } else {
            console.log(`Navigation for: ${navigationFor}`);
            response.sessionState.intent.state = "Fulfilled";
            response.messages.push({
                "contentType": "PlainText",
                "content": navigationPath
            });
        }
    }

    return response;
};


