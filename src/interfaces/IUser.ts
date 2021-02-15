import mongoose from 'mongoose';
import { IRole } from './IRole'

export interface IUser {
  role: IRole;
  name: string;
  firstSurname: string;
  secondSurname: string;
  dni: string;
  email: string;
  password: string;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMongoose extends mongoose.Document {
  role: IRole;
  name: string;
  firstSurname: string;
  secondSurname: string;
  dni: string;
  email: string;
  password: string;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}