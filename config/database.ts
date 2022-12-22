import mongoose from 'mongoose'
import ExceptionHandler from '../src/api/exceptions/exceptions-handler'

import config from './config'

// Database connection
const dbConnection = async () => {
  let attempts = 0
  const maxAttempts = 3
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  while (attempts < maxAttempts) {
    try {
      mongoose.set('strictQuery', false)
      await mongoose.connect(config.mongo_uri)
      console.log("Successfully connected to database")
      return
    } catch (error) {
      console.error(error)
      attempts++
      console.log(`database connection failed. retrying in 3 seconds... (attempt ${attempts}/${maxAttempts})`)
      await delay(3000)
    }
  }
  throw new ExceptionHandler(500, `database connection failed after ${attempts} attempts`)
}

export default dbConnection