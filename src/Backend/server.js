import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './db.js';
import FormData from './models/FormData.js';

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());

// API endpoint to receive form data
app.post('/api/formdata', async (req, res) => {
  try {
    const formData = new FormData(req.body); // Create a new instance of the FormData model
    await formData.save(); // Save form data to MongoDB
    res.status(200).json({ message: 'Form data received and stored.' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving form data.' });
  }
});

// API endpoint to get all form data
app.get('/api/formdata', async (req, res) => {
  try {
    const formDataList = await FormData.find(); // Retrieve all form data from MongoDB
    res.status(200).json(formDataList);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving form data.' });
  }
});

// API endpoint to update status
app.put('/api/formdata/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const formData = await FormData.findById(id);
    if (formData) {
      formData.status = status;
      await formData.save();
      res.status(200).json({ message: 'Status updated successfully.' });
    } else {
      res.status(404).json({ error: 'Form data not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating status.' });
  }
});

// API endpoint to get counters
app.get('/api/counters', async (req, res) => {
  try {
    const totalProjects = await FormData.countDocuments();
    const closedProjects = await FormData.countDocuments({ status: 'Closed' });
    const runningProjects = await FormData.countDocuments({ status: 'Running' });
    const closureDelay = await FormData.countDocuments({ status: 'Running', endDate: { $lt: new Date() } });
    const canceledProjects = await FormData.countDocuments({ status: 'Cancelled' });

    res.json({ totalProjects, closedProjects, runningProjects, closureDelay, canceledProjects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Updated API endpoint to get department-wise closed project data
app.get('/api/departmentData', async (req, res) => {
  try {
    const departmentData = await FormData.aggregate([
      {
        $group: {
          _id: '$department',
          totalProjects: { $sum: 1 },
          closedProjects: {
            $sum: {
              $cond: [{ $eq: ['$status', 'Closed'] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          department: '$_id',
          totalProjects: 1,
          closedProjects: 1,
          successPercentage: {
            $cond: [{ $eq: ['$totalProjects', 0] }, 0, { $multiply: [{ $divide: ['$closedProjects', '$totalProjects'] }, 100] }],
          },
        },
      },
    ]);

    res.json(departmentData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
