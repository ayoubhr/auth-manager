import dotenv from 'dotenv'
import ExceptionHandler from '../src/api/exceptions/exceptions-handler.js'

// .env variables loader
try {
  dotenv.config()
} catch (error: unknown) {
  if ((error as NodeJS.ErrnoException).code === "ENOENT") {
    throw new ExceptionHandler(500, "missing .env file")
  }
  throw new ExceptionHandler(500, (error as Error).message)
}

export default {
  port: String(process.env.PORT),
  mongo_uri: String(process.env.MONGO_URI_PROD),
  mongo_uri_dev: String(process.env.MONGO_URI_DEV),
  token_secret: process.env.TOKEN_SECRET
}