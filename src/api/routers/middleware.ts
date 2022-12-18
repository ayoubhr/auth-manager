import { Router } from 'express'
const VerifyToken = require('./../helpers/middleware-helper')

class Middleware {
  private readonly _router = Router()

  private _configure() {
    this._router.get("/welcome", VerifyToken, (req, res) => {
      res.status(200).send("Welcome 🙌 ");
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