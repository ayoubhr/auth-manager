import mongoose from 'mongoose'
import ExceptionHandler from '../exceptions/exceptions-handler.js'

import config from './config.js'

const NODE_ENV = process.env.NODE_ENV
const mongo_uri = NODE_ENV === "dev" ? config.mongo_uri_dev : config.mongo_uri_prod

// For Prod & Dev database connection
const dbConnection = async () => {
  let attempts = 0
  const maxAttempts = 3
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  while (attempts < maxAttempts) {
    try {
      mongoose.set('strictQuery', false)
      await mongoose.connect(mongo_uri)
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