import { Router } from 'express'
import handler from '../../application/handlers/middleware-handler.js'

// Controller endpoint class for managing the request handlers to 3rd party services
// while securing access with the provided JWT token that gets verified
// with the provided callback function VerifyToken.
class Middleware {
  private readonly _router = Router()

  // Secured endpoints that require a JWT auth token
  private _configure() {
    // Path to access this request is /api/v1/welcome
    this._router.get("/welcome", (req, res) => {
      res.status(200).send("Welcome 🙌")
    });

    // Path to access this request is /api/v1/define
    this._router.get("/define", handler.urbanDictionaryRequestHandler)
  }

  constructor() {
    this._configure()
  }

  get router(): Router {
    return this._router
  }
}

export default new Middleware().router