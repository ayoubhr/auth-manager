import { Router } from "express"
import validate from '../helpers/validator-helper.js'
import services from '../services/auth-services.js'

// Routing for the Auth functionalities, each path (/register user and /login user) 
// leads to an internal service managed by an async function.
// Both are accesible, no need for a JWT token to access them.
class AuthRouter {
  private readonly _router = Router()

  // the validate object properties are specified in the validator-helper class, they check that
  // the user inputs needed for each path are present and correct, otherwhise they return a
  // JSON object with the errors. 
  // Third argument is the async function that calls the respective internal service,
  // that performs the logic.
  private _configure(): void {
    this._router.post('/register', validate.reqRegisterInputData, services.registerService)

    this._router.post('/login', validate.reqLoginInputData, services.loginService)
  }

  constructor() {
    this._configure()
  }

  get router(): Router {
    return this._router
  }
}

export default new AuthRouter().router