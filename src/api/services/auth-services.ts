import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { HttpStatus } from "../../utils/http-status.js";
import User from "../../model/user.js";

// service function for the path /register
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);

    // validating all necessary user input has been sent and is correct
    if (!errors.isEmpty()) {
      const error = { message: "All input fields are required and must be correct.", errors: errors.array(), statuscode: HttpStatus.BAD_REQUEST }
      return res.status(400).send(error)
    }
    // extract user input data from req
    const { name, surname, email, password } = req.body

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
}

// service function for the path /login
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)

    // validate user credentials are present and correct.
    if (!errors.isEmpty()) {
      const error = { message: "All input fields are required and must be correct.", errors: errors.array(), statuscode: HttpStatus.BAD_REQUEST }
      return res.status(400).send(error)
    }
    // extract user input data from req
    const { email, password } = req.body

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
        process.env.TOKEN_SECRET as jwt.Secret,
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
}

const services = {
  registerService: register,
  loginService: login
}

export default services