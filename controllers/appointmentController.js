import Appointment from '../models/Appointment.js';

export const bookAppointment = async (req, res) => {
  try {
    const { appointmentDate, clinicName, notes } = req.body;

    const appointment = await Appointment.create({
      userId: req.user.id,
      appointmentDate,
      clinicName,
      notes,
    });

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id }).sort({ appointmentDate: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ appointmentDate: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

