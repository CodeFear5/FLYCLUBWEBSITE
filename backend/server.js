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
const mongodbURI = process.env.MONGO_URI || process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongodbURI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*', // Adjust this to your frontend URL in production
    optionsSuccessStatus: 200,
}));

const saltRounds = 10;

// Signup endpoint
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({ username, email, password: hashedPassword });
        res.send({ message: "User registered successfully" });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).send({ message: "Invalid username or password" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send({ message: "Invalid username or password" });

        const token = jwt.sign({ id: user._id, user: user.username }, process.env.jwt_secret, { expiresIn: '1d' });
        res.send({ message: "success", token });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).send({ message: "No token provided" });
    try {
        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).send({ message: "Unauthorized" });
    }
};

// Schedule a meeting endpoint
app.post("/api/meeting-shedule", verifyToken, async (req, res) => {
    const { date, startTime, duration, endTime, meetLink, agenda, description } = req.body;
    try {
        const formattedStartTime = convertTo12HourFormat(startTime);
        const formattedEndTime = convertTo12HourFormat(endTime);

        await Meeting.create({
            date,
            startTime: formattedStartTime,
            duration,
            endTime: formattedEndTime,
            meetLink,
            agenda,
            description,
            status: 'created',
        });

        res.send({ message: "Meeting scheduled successfully" });
    } catch (err) {
        console.log("Meeting Schedule Error:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Get scheduled meetings endpoint
app.get("/get/meeting-shedule", verifyToken, async (req, res) => {
    try {
        const meetings = await Meeting.find();
        res.json(meetings);
    } catch (err) {
        console.log("Error fetching meetings:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Delete meeting by ID endpoint
app.delete('/delete-meeting/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Meeting.findByIdAndDelete(id);
        if (result) {
            res.json({ message: 'Meeting deleted successfully' });
        } else {
            res.status(404).json({ message: 'Meeting not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update meeting status endpoint (run via a cron job or periodically)
app.put("/api/update-meeting-status", verifyToken, async (req, res) => {
    try {
        const now = new Date();
        const updatedMeetings = await Meeting.updateMany(
            {
                status: 'created',
                endTime: { $lt: now },
            },
            { $set: { status: 'completed' } }
        );
        res.json(updatedMeetings);
    } catch (error) {
        res.status(500).json({ error: "Failed to update meeting status" });
    }
});

// Helper function to convert 24-hour to 12-hour format
const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}:${minute < 10 ? '0' + minute : minute} ${period}`;
};

// Schedule a cron job to run every minute to check for completed meetings
cron.schedule('* * * * *', async () => {
    try {
        const now = new Date();
        const meetings = await Meeting.find();

        for (let meeting of meetings) {
            const meetingEndTime = new Date(meeting.date);
            const [hours, minutes] = meeting.endTime.split(':').map(Number);
            meetingEndTime.setHours(hours, minutes);

            if (now > meetingEndTime && meeting.status === 'created') {
                meeting.status = 'completed';
                await meeting.save();
                console.log(`Meeting with ID ${meeting._id} marked as completed.`);
            }
        }
    } catch (err) {
        console.log("Error updating meeting statuses via cron:", err);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
