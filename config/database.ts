import mongoose from 'mongoose'

const config = require('./config')

const dbConnection = () => {
  mongoose.set('strictQuery', false)
  mongoose.connect(config.mongo_uri)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    })
}

export default dbConnection