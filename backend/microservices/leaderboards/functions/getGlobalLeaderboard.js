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

module.exports.main = async (request, response) => {
  try {
    const leaderboard = await getGlobalLeaderboard();
    return response.status(200).json(leaderboard);
  } catch (error) {
    return response.status(500).send({error: "Failed to retrieve global leaderboard."});
  }
};
