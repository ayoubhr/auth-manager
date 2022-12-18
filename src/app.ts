import express, { Request, Response, NextFunction } from 'express'
import dbConnection from './../config/database'
import bodyParser from 'body-parser'
import RouteTable from './api/RouteTable'
import ExceptionHandler from './api/exceptions/exceptions-handler'

class App {
  public init = express()

  constructor() {
    dbConnection()
  }
}

const app = new App()

app.init.use(bodyParser.json())

app.init.use('/api', RouteTable)

app.init.use((err: ExceptionHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message
  })
})

module.exports = app.init