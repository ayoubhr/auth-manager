import { Router } from 'express'
import AuthRouter from './infrastructure/routers/auth-router.js'
import MiddlewareRouter from './infrastructure/routers/middleware-router.js'
import verifyToken from './application/helpers/middleware-helper.js'

// The route table job comes once we are inside the application through the initial /api path.
// Works as a gateway door to internal routers, where each provided router holds a set of
// services or 3rd party services request handlers.
class RouteTable {
  private readonly _router = Router()
  private readonly _auth = AuthRouter
  private readonly _middleware = MiddlewareRouter

  // Bind each router to a different path.
  private _configure(): void {
    // Open path no need for authentication
    this._router.use('/auth', this._auth)
    // Provided callback function VerifyToken to authenticate the JWT token
    this._router.use('/v1', verifyToken, this._middleware)
  }

  // Bootstraps the routing configuration once the object is created
  constructor() {
    this._configure()
  }

  // returns the router
  get router(): Router {
    return this._router
  }
}

export default new RouteTable().router