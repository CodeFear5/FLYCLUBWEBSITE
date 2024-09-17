import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Meeting from './models/zoomlink.js'; // Import Meeting model
import User from './models/User.js';
import cron from 'node-cron';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongodbURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongodbURI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'https://flyclub.vercel.app', // Adjust this to your frontend URL in production
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// Routes
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
});

app.get('/api/meeting-shedule', async (req, res) => {
    const meetings = await Meeting.find({ userId: req.userId });
    res.json(meetings);
});

// Schedule Meeting
app.post('/api/meeting-shedule', async (req, res) => {
    const { date, startTime, duration, agenda, meetLink, description, endTime } = req.body;
    const meeting = new Meeting({ date, startTime, duration, agenda, meetLink, description, endTime, userId: req.userId });
    await meeting.save();
    res.status(201).json({ message: 'Meeting scheduled successfully' });
});

// Get Meetings
app.get('/api/login', async (req, res) => {
    const meetings = await Meeting.find({ userId: req.userId });
    res.json(meetings);
});

// Delete Meeting
app.delete('/delete-meeting/:id', async (req, res) => {
    const { id } = req.params;
    await Meeting.findByIdAndDelete(id);
    res.json({ message: 'Meeting deleted successfully' });
});

// Update Meeting Status
app.put('/api/update-meeting-status', async (req, res) => {
    const { id, status } = req.body;
    const updatedMeeting = await Meeting.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedMeeting);
});


app.get("/", console.log("server is succefully running") )
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
