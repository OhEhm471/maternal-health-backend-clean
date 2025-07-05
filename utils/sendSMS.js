import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to,
    });
    console.log(`📤 SMS sent to ${to}: ${response.sid}`);
  } catch (err) {
    console.error('❌ SMS send error:', err.message);
  }
};

export default sendSMS;
