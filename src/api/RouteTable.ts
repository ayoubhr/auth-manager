import { Router } from 'express'
import AuthRouter from './routers/auth-router'
import MiddlewareRouter from './routers/middleware-router'

// The route table job comes once we are inside the application through the initial /api path.
// Works as a gateway door to internal services, where each provided router holds a set of
// controller endpoints on its specified path.
class RouteTable {
  private readonly _router = Router()
  private readonly _auth = AuthRouter
  private readonly _middleware = MiddlewareRouter

  // Bind each router to a different path.
  private _configure(): void {
    this._router.use('/auth', this._auth)
    this._router.use('/v1', this._middleware)
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