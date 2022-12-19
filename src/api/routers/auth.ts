import { Router } from "express"
import { User } from "./../../model/user"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { HttpStatus } from "../../utils/http-status"

// Controller with register user and login user endpoints.
// Open, no need for JWT token to access them.
class AuthRouter {
  private readonly _router = Router()

  private _configure(): void {
    this._router.post('/register', async (req, res, next) => {
      try {
        // extract user input data from req
        const { name, surname, email, password } = req.body

        // validating all necessary user input has been sent
        if (!(name && surname && email && password)) {
          const error = { error: "All inputs fields are required.", statuscode: HttpStatus.BAD_REQUEST }
          return res.status(400).send(error)
        }

        // check and validate user is not already registered
        const existingUser = await User.findOne({ email })

        if (existingUser) {
          const error = { error: "User already exists.", statuscode: HttpStatus.CONFLICT }
          return res.status(409).send(error)
        }

        // encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10)

        // create user document in our database
        const user = await User.create({
          name,
          surname,
          email,
          password: encryptedPassword
        })

        // return new user
        return res.status(201).json(user)
      } catch (error) {
        console.log(error)
        next(error)
      }
    })

    this._router.post('/login', async (req, res, next) => {
      try {
        // extract user input data from req
        const { email, password } = req.body

        // validate user input
        if (!(email && password)) {
          const error = { error: "All input fields are required.", statuscode: HttpStatus.BAD_REQUEST }
          return res.status(400).send(error)
        }

        // check and validate if the user is already registered
        const user = await User.findOne({ email })

        if (!user) {
          const error = { error: "This user is not registered.", statuscode: HttpStatus.NOT_FOUND }
          return res.status(404).send(error)
        }

        // validate credentials match
        if (user && (await bcrypt.compare(password, user.password))) {
          // create JWT token
          const token = jwt.sign(
            { user_id: user._id, email },
            (process.env.token_secret as jwt.Secret),
            {
              expiresIn: "3h"
            }
          )

          // save jwt token in user
          user.token = token

          // return new user
          return res.status(200).json(user)
        }

        // if credentials do not match
        const error = { error: "Invalid Credentials.", statuscode: HttpStatus.BAD_REQUEST }
        return res.status(400).send(error);
      } catch (error) {
        console.log(error)
        next(error)
      }
    })
  }

  constructor() {
    this._configure()
  }

  get router(): Router {
    return this._router
  }
}

export = new AuthRouter().router