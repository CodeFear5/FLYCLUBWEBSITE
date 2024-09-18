import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Meeting from '../models/zoomlink.js';
import User from '../models/User.js';
import multer  from 'multer'
import Data from '../models/history.js'
import path from 'path';
import { fileURLToPath } from 'url'; 
import { dirname } from 'path'; 
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;
const mongodbURI = process.env.MONGO_URI;
console.log('MONGO_URI:', mongodbURI);

mongoose.connect("mongodb+srv://codeinovator:codeinovator123@flyclubwebsite.wdsl3.mongodb.net/?retryWrites=true&w=majority&appName=FLYCLUBWEBSITE")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3001', // Adjust this to your frontend URL in production
}));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // Check for missing fields
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.post('/api/register', async (req, res) => {
    const { email, password, username } = req.body;

    // Check for missing fields
    if (!email || !password || !username) {
        return res.status(400).json({ message: 'Email, username, and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, username });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/get/meeting-shedule', async (req, res) => {
  try {
      const meetings = await Meeting.find();
      res.status(200).json(meetings);
  } catch (error) {
      console.error('Error fetching meetings:', error);
      res.status(500).json({ success: false, error: 'Server Error' });
  }
});

app.post('/api/meeting-shedule', async (req, res) => {
  const { date, startTime, duration, agenda, meetLink, description, endTime } = req.body;

  if (!date || !startTime || !duration || !agenda || !meetLink || !description || !endTime) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
      const newMeeting = new Meeting({ date, startTime, duration, agenda, meetLink, description, endTime });
      await newMeeting.save();
      res.status(201).json({ success: true, message: 'Meeting scheduled successfully', meeting: newMeeting });
  } catch (error) {
      console.error('Error scheduling meeting:', error);
      res.status(500).json({ success: false, error: 'Server Error' });
  }
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
 
app.post('/upload-data', upload.single('pdfFile'), async (req, res) => {
    try {
      const newData = new Data({
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
        pdfFile: {
          filePath: `${req.file.filename}`,
          contentType: req.file.mimetype,
        },
      });
  
      const savedData = await newData.save();
      res.json(savedData);
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data');
    }
  });
  
  app.get('/get-data', async (req, res) => {
    try {
      const data = await Data.find(); 
      res.json(data);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).send('Error retrieving data');
    }
  });

  app.get('/', (req, res) => {
    res.send('Server running');
  });
  

  app.put('/api/meetings/:id', async (req, res) => {
  const { id } = req.params;
  const { agenda, date, startTime, endTime, meetLink, status, description } = req.body;

  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      id,
      {
        agenda,
        date,
        startTime,
        endTime,
        meetLink,
        status,
        description,
      },
      { new: true }
    );

    if (!updatedMeeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    res.json(updatedMeeting);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update meeting' });
  }
});

app.delete('/api/meetings/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMeeting = await Meeting.findByIdAndDelete(id);

    if (!deletedMeeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    res.json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete meeting' });
  }
});
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

export default app;