const admin = require("firebase-admin");

if (!admin.apps.length) {
  const serviceAccount = require("../serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

const filterLeaderboardByTimeFrame = async (timeFrame) => {
  try {
    let startDate;

    if (timeFrame === "daily") {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
    } else if (timeFrame === "weekly") {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
    } else if (timeFrame === "monthly") {
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
    }

    const leaderboardSnapshot = await db
      .collection("leaderboard")
      .where("createdat", ">=", startDate)
      .get();

    const leaderboard = [];

    leaderboardSnapshot.forEach((doc) => {
      leaderboard.push(doc.data());
    });

    return leaderboard;
  } catch (error) {
    throw new Error("Failed to filter leaderboard by time frame.");
  }
};

module.exports.main = async (event) => {
  try {
    const { timeFrame } = event.pathParameters;

    const leaderboard = await filterLeaderboardByTimeFrame(timeFrame);
    const response = {
      statusCode: 200,
      body: JSON.stringify(leaderboard),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to filter leaderboard by time frame." }),
    };

    return response;
  }
};
