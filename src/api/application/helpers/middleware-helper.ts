import { Response, Request, NextFunction } from 'express'
import { HttpStatus } from "../utils/http-status.js";
import jwt from "jsonwebtoken"
import pkg from 'jsonwebtoken'
const { TokenExpiredError } = pkg

// function that determines whether the received request from client holds an auth token
// and if the token is valid or invalid. 
// Returns a JSON object response with the errors if JWT token is invalid,
// Lets you access the targeted endpoint if JWT token is valid.
function verifyToken(req: Request, res: Response, next: NextFunction): void | Response<any> {

  // loads secret from env variables and extracts the token from the request
  const secret = process.env.TOKEN_SECRET as jwt.Secret
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  // validates token is not empty
  if (!token) {
    const error = { error: "A token is required for authentication.", statuscode: HttpStatus.FORBIDDEN }
    return res.status(403).send(error);
  }

  // decodes the token with the secret to check if the token is valid
  try {
    const decoded = jwt.verify(token, secret);
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).send({ message: 'Invalid token. Access Token is expired.', statuscode: HttpStatus.UNAUTHORIZED });
    }
    const error = { error: "Invalid Token.", statuscode: HttpStatus.UNAUTHORIZED }
    return res.status(401).send(error);
  }

  return next();
};

export default verifyToken