const SnsService = require("./services/sns.service");

const unsubscribeEmailNotification = async (email) => {
  try {
    await SnsService.unsubscribeEmailNotification(email);
    return { message: "Email unsubscribed successfully." };
  } catch (error) {
    throw new Error("Failed to unsubscribe from email notification.");
  }
};

module.exports.main = async (event) => {
  try {
    const { email } = JSON.parse(event.body);

    const unsubscription = await unsubscribeEmailNotification(email);
    const response = {
      statusCode: 200,
      body: JSON.stringify(unsubscription),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };

    return response;
  }
};
