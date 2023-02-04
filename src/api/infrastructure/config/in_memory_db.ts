import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'

let mongod: MongoMemoryServer;
let client: MongoClient;

// Testing purposes in-memory Database
const inMemoryMongo = {
  start: async () => {
    try {
      mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      console.log(`In-Memory MongoDB instance URI: ${uri}`);
      await mongod.ensureInstance();
    } catch (error) {
      console.error(`Error starting MongoDB instance:\r\n${error}`);
    }
  },

  connect: async () => {
    try {
      const uri = mongod.getUri();
      client = new MongoClient(uri);
      await client.connect();
      console.log('Connected to MongoDB In-Memory instance.');
    } catch (error) {
      console.error(`Error connecting to MongoDB instance:\r\n${error}`);
    }
  },

  stop: async () => {
    try {
      await client.close();
      await mongod.stop();
      console.log('\r\nStopping MongoDB In-Memory instance...');
    } catch (error) {
      console.error(`Error stopping MongoDB instance:\r\n${error}`);
    }
  }
};

export default inMemoryMongo