import { Router } from "express"
import validate from '../helpers/validator-helper'
import controllers from '../controllers/auth-controller'

// Controller with register user and login user endpoints.
// Open, no need for JWT token to access them.
class AuthRouter {
  private readonly _router = Router()

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

export = new AuthRouter().router