import mongoose from 'mongoose';
import { CATEGORY, PRODUCT } from '@utils/string';

const Product = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CATEGORY,
  },
  code: {
    type: String,
    max: 50,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
    max: 50
  },
  stock: {
    type: Number,
    min: 0,
    required: true
  },
  price: {
    type: Number,
    min: 0.00, 
    default: 0.00
  },
  isActive: {
    type: Boolean,
    default: true
  },
  urlImagePath: {
    type: String,
    max: 1024,
    default: null
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

export default mongoose.model(PRODUCT, Product)