import { Schema, model } from 'mongoose';

const schema = new Schema({
  keyPoint: { type: String, required: true },
  company: { type: String, required: true },
  companyWebsite: { type: String, required: true },
  location: { type: String, required: true },
  jobPosition: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  descriptionPoints: { type: Array, of: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  userId: { type: String, required: true, default: 'google-oauth2|100859891013293195235' }
});

export default model('Work', schema);
