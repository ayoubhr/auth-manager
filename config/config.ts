import dotenv from 'dotenv'
import ExceptionHandler from '../src/api/exceptions/exceptions-handler'

// .env variables loader
try {
  dotenv.config()
  module.exports = {
    port: String(process.env.PORT),
    mongo_uri: String(process.env.MONGO_URI),
    token_secret: process.env.TOKEN_SECRET
  }
} catch (error: unknown) {
  if ((error as NodeJS.ErrnoException).code === "ENOENT") {
    throw new ExceptionHandler(500, "missing .env file")
  }
  throw new ExceptionHandler(500, (error as Error).message)
}