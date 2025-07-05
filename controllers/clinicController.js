import Clinic from '../models/Clinic.js';

// Provider adds or updates their clinic info
export const saveClinic = async (req, res) => {
  try {
    const { name, address, phoneNumber, latitude, longitude } = req.body;

    const existingClinic = await Clinic.findOne({ providerId: req.user.id });

    const clinicData = {
      name,
      address,
      phoneNumber,
      providerId: req.user.id,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    };

    let clinic;
    if (existingClinic) {
      clinic = await Clinic.findByIdAndUpdate(existingClinic._id, clinicData, { new: true });
    } else {
      clinic = await Clinic.create(clinicData);
    }

    res.status(200).json({ message: 'Clinic saved', clinic });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to save clinic' });
  }
};

// Pregnant woman searches for clinics nearby
export const findNearbyClinics = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const clinics = await Clinic.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 10000, // within 10 km
        },
      },
    });

    res.json(clinics);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to fetch nearby clinics' });
  }
};
