const SnsService = require("./services/sns.service");

const subscribeEmailNotification = async (email) => {
  try {
    await SnsService.subscribeEmailNotification(email);
    return { message: "Email subscription successful." };
  } catch (error) {
    throw new Error("Failed to subscribe for email notification.");
  }
};

module.exports.main = async (event) => {
  try {
    const { email } = JSON.parse(event.body);

    const subscription = await subscribeEmailNotification(email);
    const response = {
      statusCode: 200,
      body: JSON.stringify(subscription),
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
