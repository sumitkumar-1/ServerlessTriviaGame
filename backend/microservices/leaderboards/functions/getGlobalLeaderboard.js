const admin = require("firebase-admin");

if (!admin.apps.length) {
  const serviceAccount = require("../serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

const getGlobalLeaderboard = async () => {
  try {
    const leaderboardSnapshot = await db.collection("leaderboard").get();
    const leaderboard = [];

    leaderboardSnapshot.forEach((doc) => {
      leaderboard.push(doc.data());
    });

    return leaderboard;
  } catch (error) {
    throw new Error("Failed to retrieve global leaderboard.");
  }
};

module.exports.main = async (event) => {
  try {
    const leaderboard = await getGlobalLeaderboard();
    const response = {
      statusCode: 200,
      body: JSON.stringify(leaderboard),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve global leaderboard." }),
    };

    return response;
  }
};
