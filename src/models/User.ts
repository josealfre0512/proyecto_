import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

// Un esquema limpio que utiliza directamente la interfaz básica
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);