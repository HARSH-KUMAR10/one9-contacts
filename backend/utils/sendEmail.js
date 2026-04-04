const axios = require('axios');
const nodemailer = require('nodemailer');

/**
 * Utility to send email using one9-mail API (or nodemailer if needed later)
 */
const sendEmail = async (options) => {
  try {
    // Determine the strategy based on configured API key/endpoint
    if (process.env.ONE9_MAIL_API_KEY && process.env.ONE9_MAIL_ENDPOINT) {
      const response = await axios.post(
        process.env.ONE9_MAIL_ENDPOINT,
        {
          to: options.to,
          subject: options.subject,
          text: options.text,
          html: options.html,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.ONE9_MAIL_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } else {
      console.warn('one9-mail API credentials not configured. Falling back to console log.');
      // If needed later, nodemailer implementation can be implemented here:
      // const transporter = nodemailer.createTransport({ ... });
      // return await transporter.sendMail({ ... });
      
      console.log('Email simulated:', options);
      return { msg: 'Simulated email sent' };
    }
  } catch (error) {
    console.error('Email sending failed:', error.message);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
