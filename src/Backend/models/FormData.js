import mongoose from 'mongoose';

const FormDataSchema = new mongoose.Schema({
  description: { type: String, required: true },
  reason: { type: String, required: true },
  type: { type: String, required: true },
  division: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, required: true },
  department: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  status: { type: String, default: '' },
});

const FormData = mongoose.model('FormData', FormDataSchema);

export default FormData;
