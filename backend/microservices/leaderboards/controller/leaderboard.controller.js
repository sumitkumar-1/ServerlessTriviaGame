const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

const updateLeaderboard = async (request, response) => {
  try {
    const { entityId, entityType, gameId, category, result, totalScore } =
      request.body;

    const leaderboardQuerySnapshot = await db
      .collection("leaderboard")
      .where("entityId", "==", entityId)
      .limit(1)
      .get();

    let leaderboardDocRef;
    let isNewEntry = true;

    if (leaderboardQuerySnapshot.empty) {
      leaderboardDocRef = db.collection("leaderboard").doc();
    } else {
      leaderboardDocRef = leaderboardQuerySnapshot.docs[0].ref;
      isNewEntry = false;
    }

    const numericTotalScore = Number(totalScore);

    if (isNaN(numericTotalScore)) {
      throw new Error("Invalid totalScore value. Please provide a number.");
    }

    await db.runTransaction(async (transaction) => {
      const leaderboardDoc = await transaction.get(leaderboardDocRef);

      if (!leaderboardDoc.exists) {
        const newEntry = {
          entityId,
          entityType,
          statistics: [
            {
              id: gameId,
              category,
              result,
              totalScore: numericTotalScore,
              created_at: admin.firestore.Timestamp.now(),
            },
          ],
          gamesPlayed: 1,
          wins: result === "win" ? 1 : 0,
          losses: result === "loss" ? 1 : 0,
          totalPoints: numericTotalScore,
          winPercentage: result === "win" ? 100 : 0,
          averageScore: numericTotalScore,
          updatedat: admin.firestore.Timestamp.now(),
          createdat: admin.firestore.Timestamp.now(),
        };

        transaction.set(leaderboardDocRef, newEntry);
      } else {
        const leaderboardEntry = leaderboardDoc.data();

        leaderboardEntry.statistics.push({
          id: gameId,
          category,
          result,
          totalScore: numericTotalScore,
          created_at: admin.firestore.Timestamp.now(),
        });

        leaderboardEntry.gamesPlayed += 1;
        leaderboardEntry.wins += result === "win" ? 1 : 0;
        leaderboardEntry.losses += result === "loss" ? 1 : 0;
        leaderboardEntry.totalPoints += numericTotalScore;
        leaderboardEntry.winPercentage =
          (leaderboardEntry.wins / leaderboardEntry.gamesPlayed) * 100;
        leaderboardEntry.averageScore =
          leaderboardEntry.totalPoints / leaderboardEntry.gamesPlayed;
        leaderboardEntry.updatedat = admin.firestore.Timestamp.now();

        transaction.update(leaderboardDocRef, leaderboardEntry);
      }
    });

    const message = isNewEntry
      ? "New leaderboard entry created."
      : "Leaderboard updated successfully.";
    response.status(200).json({ message });
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    response.status(500).json({ error: "Failed to update leaderboard." });
  }
};

const getGlobalLeaderboard = async (request, response) => {
  try {
    const leaderboardSnapshot = await db.collection("leaderboard").get();
    const leaderboard = [];

    leaderboardSnapshot.forEach((doc) => {
      leaderboard.push(doc.data());
    });

    response.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error retrieving global leaderboard:", error);
    response
      .status(500)
      .json({ error: "Failed to retrieve global leaderboard." });
  }
};

const filterLeaderboardByTimeFrame = async (request, response) => {
  try {
    const { timeFrame } = request.params;
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

    response.status(200).json(leaderboard);
  } catch (error) {
    console.error(
      `Error filtering leaderboard by '${timeFrame}' time frame:`,
      error
    );
    response
      .status(500)
      .json({ error: "Failed to filter leaderboard by time frame." });
  }
};

const getEntityStatistics = async (request, response) => {
  try {
    const { entityId, category } = request.params;

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

    response.status(200).json(statistics);
  } catch (error) {
    console.error(
      `Error retrieving statistics for entityId '${entityId}' and category '${category}:`,
      error
    );
    response
      .status(500)
      .json({ error: "Failed to retrieve entity statistics by category." });
  }
};

const getLeaderboardByEntityId = async (request, response) => {
  try {
    const { entityId } = request.params;

    const leaderboardSnapshot = await db
      .collection("leaderboard")
      .where("entityId", "==", entityId)
      .get();
    const leaderboard = [];

    leaderboardSnapshot.forEach((doc) => {
      leaderboard.push(doc.data());
    });

    response.status(200).json(leaderboard);
  } catch (error) {
    console.error(
      `Error retrieving leaderboard for Entity Id '${entityId}':`,
      error
    );
    response
      .status(500)
      .json({ error: "Failed to retrieve leaderboard by Entity Id." });
  }
};

module.exports = {
  updateLeaderboard,
  getGlobalLeaderboard,
  filterLeaderboardByTimeFrame,
  getEntityStatistics,
  getLeaderboardByEntityId,
};
