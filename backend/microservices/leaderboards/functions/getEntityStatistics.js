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

module.exports.main = async (request, response) => {
  try {
    const { entityId, category } = request.body;
    const statistics = await getEntityStatistics(entityId, category);
    return response.status(200).json(statistics);
  } catch (error) {
    return response.status(500).send({error: "Failed to retrieve entity statistics by category."});
  }
};
