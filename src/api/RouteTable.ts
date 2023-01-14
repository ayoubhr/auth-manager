import { Router } from 'express'
import AuthRouter from './routers/auth-router.js'
import MiddlewareRouter from './routers/middleware-router.js'
import verifyToken from './helpers/middleware-helper.js'

// The route table job comes once we are inside the application through the initial /api path.
// Works as a gateway door to internal routers, where each provided router holds a set of
// controller endpoints.
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