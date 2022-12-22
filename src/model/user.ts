import mongoose from 'mongoose'
import { IUser } from './domain/interfaces'

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  surname: { type: String, default: null },
  email: { type: String },
  password: { type: String },
  token: { type: String }
})

const User = mongoose.model<IUser>("User", userSchema)

export default User