import { Router } from 'express'
const VerifyToken = require('./../helpers/middleware-helper')

// Controller class where you can create your http request endpoints to 3rd services
// while securing them with the provided JWT token that gets verified
// with the provided callback function VerifyToken.
class Middleware {
  private readonly _router = Router()

  private _configure() {
    // Endpoint secured with a JWT auth token that is verified
    // Path to access this endpoint is /api/v1/welcome
    this._router.get("/welcome", VerifyToken, (req, res) => {
      res.status(200).send("Welcome 🙌");
    });
  }

  constructor() {
    this._configure()
  }

  get router(): Router {
    return this._router
  }
}

export = new Middleware().router