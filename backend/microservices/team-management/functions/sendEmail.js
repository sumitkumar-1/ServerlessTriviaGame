const nodemailer = require('nodemailer');

exports.main = async (event) => {
  try {
    const messages = event.Records.map((record) => {
      return JSON.parse(record.body);
    });

    for (const message of messages) {
      console.log('Received message:', message);

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.RECIPIENT_EMAIL,
        subject: 'Trivia Team Notification',
        text: 'New item added to the queue: ' + JSON.stringify(message)
      };

      await transporter.sendMail(mailOptions);
      console.log('Email notification sent.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
