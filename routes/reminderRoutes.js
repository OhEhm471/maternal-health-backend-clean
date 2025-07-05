import express from 'express';
import dayjs from 'dayjs';

import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import sendSMS from '../utils/sendSMS.js';

const router = express.Router();

// Example: /api/reminders/run
router.get('/run', async (req, res) => {
  try {
    const now = new Date();
    const in24hrs = dayjs(now).add(24, 'hour').toDate();

    const appointments = await Appointment.find({
      reminderSent: false,
      appointmentDate: { $lte: in24hrs, $gte: now }
    }).populate('userId');

    for (const appt of appointments) {
      const user = appt.userId;
      if (!user?.phoneNumber) continue;

      const message = `Reminder: You have an appointment at ${appt.clinicName} on ${dayjs(appt.appointmentDate).format('dddd, MMM D')} at ${dayjs(appt.appointmentDate).format('h:mm A')}.`;

      await sendSMS(user.phoneNumber, message);

      appt.reminderSent = true;
      await appt.save();
    }

    res.json({ message: `✅ Sent ${appointments.length} reminders.` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to send reminders' });
  }
});

export default router;
