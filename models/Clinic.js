import mongoose from 'mongoose';

const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  phoneNumber: String,
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// For geospatial queries
clinicSchema.index({ location: '2dsphere' });

const Clinic = mongoose.model('Clinic', clinicSchema);
export default Clinic;
