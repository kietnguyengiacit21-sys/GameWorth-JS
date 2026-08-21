let transporter;

function getTransporter() {
  if (!transporter) {
    const nodemailer = require('nodemailer');

    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER?.trim(),
        pass: process.env.SMTP_PASSWORD?.replace(/\s+/g, ''),
      },
    });
  }

  return transporter;
}

async function sendRegistrationCode(email, code) {
  const hasSmtpConfig = Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD &&
    process.env.MAIL_FROM,
  );

  if (!hasSmtpConfig) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Email service is not configured');
    }

    console.log(`Registration code for ${email}: ${code}`);
    return false;
  }

  try {
    await getTransporter().sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Your GameWorth verification code',
      text: `Your GameWorth verification code is ${code}. It expires in 10 minutes.`,
    });
  } catch (error) {
    console.error('Unable to send registration email:', error.message);
    throw new Error(
      'Unable to send verification email. Check Gmail SMTP_USER and App Password.',
    );
  }

  return true;
}

module.exports = {sendRegistrationCode};