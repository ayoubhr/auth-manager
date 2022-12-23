import { NextFunction } from "express"
// custom exception handler
export default class ExceptionHandler extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super()
    console.error(`Exception raised --> statusCode: ${statusCode} message: ${message}`)
  }
}