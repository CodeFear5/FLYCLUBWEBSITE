import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    duration: { type: Number, required: true },
    endTime: { type: String, required: true },
    meetLink: { type: String, required: true },  // Ensure this is consistent
    agenda: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, default: 'created' }, // Add status with default value
    completedAt: { type: Date },
  });
  
const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;
