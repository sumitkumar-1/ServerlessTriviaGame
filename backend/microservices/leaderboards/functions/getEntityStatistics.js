const admin = require("firebase-admin");

if (!admin.apps.length) {
  const serviceAccount = require("../serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

const getEntityStatistics = async (entityId, category) => {
  try {
    const leaderboardSnapshot = await db.collection("leaderboard").get();
    const statistics = [];

    leaderboardSnapshot.forEach((doc) => {
      const leaderboardEntry = doc.data();
      if (
        leaderboardEntry.entityId === entityId &&
        leaderboardEntry.statistics.some((stat) => stat.category === category)
      ) {
        const entityStatistics = leaderboardEntry.statistics.filter(
          (stat) => stat.category === category
        );
        statistics.push(...entityStatistics);
      }
    });

    return statistics;
  } catch (error) {
    throw new Error("Failed to retrieve entity statistics by category.");
  }
};

module.exports.main = async (event) => {
  try {
    const { entityId, category } = event.pathParameters;

    const statistics = await getEntityStatistics(entityId, category);
    const response = {
      statusCode: 200,
      body: JSON.stringify(statistics),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to retrieve entity statistics by category.",
      }),
    };

    return response;
  }
};
