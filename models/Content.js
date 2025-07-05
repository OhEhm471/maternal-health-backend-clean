import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  mediaUrl: String, // image/video/audio URL (optional)
  category: {
    type: String,
    enum: ['Pregnancy', 'Nutrition', 'Labour', 'Postnatal', 'Danger Signs'],
    default: 'Pregnancy',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Content = mongoose.model('Content', contentSchema);
export default Content;
