import { Router } from "express"
import validate from '../helpers/validator-helper'
import controllers from '../controllers/auth-controller'

// Routing for the Auth functionalities, each path (/register user and /login user) 
// leads to a controller endpoint managed by an async function.
// Both are open, no need for a JWT token to access them.
class AuthRouter {
  private readonly _router = Router()

  // the validate object properties are specified in the validator-helper class, they verify that
  // the user inputs for each path are correct, otherwhise they return a JSON object with the errors.
  // Third argument is the async function that calls the controller endpoint.
  private _configure(): void {
    this._router.post('/register', validate.reqRegisterInputData, controllers.registerController)

    this._router.post('/login', validate.reqLoginInputData, controllers.loginController)
  }

  constructor() {
    this._configure()
  }

  get router(): Router {
    return this._router
  }
}

export default new AuthRouter().router