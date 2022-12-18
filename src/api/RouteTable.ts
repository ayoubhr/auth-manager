import { Router } from 'express'
import AuthRouter from './routers/auth'
import MiddlewareRouter from './routers/middleware'

class RouteTable {
  private readonly _router = Router()
  private readonly _auth = AuthRouter
  private readonly _middleware = MiddlewareRouter

  private _configure(): void {
    this._router.use('/auth', this._auth)
    this._router.use('/v1', this._middleware)
  }

  constructor() {
    this._configure()
  }

  get router(): Router {
    return this._router
  }
}

export = new RouteTable().router