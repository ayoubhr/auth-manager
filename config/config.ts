import dotenv from 'dotenv'

dotenv.config()

module.exports = {
  port: String(process.env.PORT),
  mongo_uri: String(process.env.MONGO_URI),
  token_secret: process.env.TOKEN_SECRET
}