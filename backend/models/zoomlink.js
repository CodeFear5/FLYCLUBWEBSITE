import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    duration: { type: Number, required: true },
    agenda: { type: String, required: true },
    meetLink: { type: String, required: true },
    description: { type: String, required: true },
    endTime: { type: String },
    status: { type: String, default: 'Scheduled' },
    meet:{type:Number}
});

const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;
