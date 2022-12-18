import { Document } from 'mongoose'
import { Request } from "express"
import { JwtPayload } from 'jsonwebtoken'

export interface IUser extends Document {
  name: string,
  surname: string,
  email: string,
  password: string,
  token: string
}

export interface IGetUserAuthInfoRequest extends Request {
  user: string | JwtPayload
}