import { Router } from 'express'
import verifyToken from './../helpers/middleware-helper';
import controller from './../controllers/middleware-controller'
import ExceptionHandler from '../exceptions/exceptions-handler';

// Controller endpoint where you can create your http request endpoints to 3rd party services
// while securing them with the provided JWT token that gets verified
// with the provided callback function VerifyToken.
class Middleware {
  private readonly _router = Router()

  private _configure() {
    // Endpoint secured with a JWT auth token that is verified
    // Path to access this endpoint is /api/v1/welcome
    this._router.get("/welcome", verifyToken, (req, res) => {
      res.status(200).send("Welcome 🙌")
    });

    this._router.get("/define", verifyToken, controller.urbanDictionaryRequest)
  }
  
  constructor() {
    this._configure()
  }

  get router(): Router {
    return this._router
  }
}

export default new Middleware().router