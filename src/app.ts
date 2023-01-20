import express, { Request, Response, NextFunction } from 'express'
import dbConnection from './../config/database.js'
import bodyParser from 'body-parser'
import RouteTable from './api/RouteTable.js'
import ExceptionHandler from './api/infrastructure/exceptions/exceptions-handler.js'
import inMemoryMongo from '../config/in_memory_db.js'

export const App = express()

const NODE_ENV = process.env.NODE_ENV

switch (NODE_ENV) {
  case "test":
    // in-memory database for test cases
    await inMemoryMongo.start()
    await inMemoryMongo.connect()
    break;
  default:
    // Prod & Dev databases
    dbConnection()
}

App.use(bodyParser.json())

App.use('/api', RouteTable)

App.use((err: ExceptionHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message
  })
})