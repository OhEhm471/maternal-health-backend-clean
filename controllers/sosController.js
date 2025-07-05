import SOS from '../models/SOS.js';
import User from '../models/User.js';
import sendSMS from '../utils/sendSMS.js';

export const triggerSOS = async (req, res) => {
  try {
    const { location } = req.body;

    const sos = await SOS.create({
      userId: req.user.id,
      location,
    });

    // Find all healthcare providers (could filter by region later)
    const providers = await User.find({ role: 'provider' });

    const user = await User.findById(req.user.id);

    // Send SMS to all providers
    for (const provider of providers) {
      if (provider.phoneNumber) {
        await sendSMS(
          provider.phoneNumber,
          `🚨 SOS Alert: ${user.fullName} needs urgent help at ${location}. Please respond if nearby.`
        );
      }
    }

    res.status(201).json({
      message: 'SOS alert sent successfully',
      sosId: sos._id,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to trigger SOS' });
  }
};
