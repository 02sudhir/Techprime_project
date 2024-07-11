import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  status: { type: String, required: true },
  department: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
