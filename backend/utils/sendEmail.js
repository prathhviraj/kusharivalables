const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Option to use Mailtrap for dev or any SMTP credentials in .env
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_EMAIL || 'your_mailtrap_user_here', // change in prod
      pass: process.env.SMTP_PASSWORD || 'your_mailtrap_pass_here', // change in prod
    },
  });

  const message = {
    from: `${process.env.FROM_NAME || 'Kusharivals'} <${process.env.FROM_EMAIL || 'noreply@kusharivals.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
