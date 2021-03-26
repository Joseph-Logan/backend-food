import mongoose from 'mongoose';
import { CATEGORY } from '@utils/string';

const Category = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 50,
    unique: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
})

export default mongoose.model(CATEGORY, Category)