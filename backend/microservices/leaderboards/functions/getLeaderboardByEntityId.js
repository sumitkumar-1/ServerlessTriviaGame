const admin = require("firebase-admin");

if (!admin.apps.length) {
  const serviceAccount = require("../serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

const getLeaderboardByEntityId = async (entityId) => {
  try {
    const leaderboardSnapshot = await db
      .collection("leaderboard")
      .where("entityId", "==", entityId)
      .get();
    const leaderboard = [];

    leaderboardSnapshot.forEach((doc) => {
      leaderboard.push(doc.data());
    });

    return leaderboard;
  } catch (error) {
    throw new Error("Failed to retrieve leaderboard by Entity Id.");
  }
};

module.exports.main = async (event) => {
  try {
    const { entityId } = event.pathParameters;

    const leaderboard = await getLeaderboardByEntityId(entityId);
    const response = {
      statusCode: 200,
      body: JSON.stringify(leaderboard),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to retrieve leaderboard by Entity Id.",
      }),
    };

    return response;
  }
};
