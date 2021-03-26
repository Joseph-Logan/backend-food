import mongoose from 'mongoose';
import { ROLE, USER } from '@utils/string';
import { bcryptPassword } from '@services/password';
import { IUserMongoose } from '@interfaces/IUser';

const User = new mongoose.Schema({
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ROLE
  },
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  firstSurname: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  secondSurname: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  dni: {
    type: String,
    required: true,
    min: 9,
    unique: true
  },
  password: { 
    type: String, 
    required: true, 
    max: 1024, 
    min: 6
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
    unique: true
  },
  avatar: {
    type: String,
    required: false,
    default: null
  },
  isEnabled: {
    type: Boolean,
    default: true
  },
  last_sign_in: {
    type: Date,
    default: new Date()
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

/**
* Always when event save is dispatched, it's will encrypt the password
*/
User.pre<IUserMongoose>('save', async function (next) {
  try {
    let encryptedPassword = await bcryptPassword(this.password)
    this.password = encryptedPassword
    next()
  } catch (err) {
    next(err)
  }
})

export default mongoose.model(USER, User)