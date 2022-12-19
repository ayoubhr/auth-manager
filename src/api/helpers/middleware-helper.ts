import jwt from "jsonwebtoken"
import { IGetUserAuthInfoRequest } from "../../model/domain/interfaces";
import { Response, NextFunction } from 'express'
import { HttpStatus } from "../../utils/http-status";

// function that determines whether the received request from client hold an auth token
// and if the token is valid or invalid. Returns a response if invalid, lets you access
// the targeted endpoint if valid.
function verifyToken(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): void | Response<any> {
  
  // loads secret from env variables and extracts the token from the request
  const secret = process.env.token_secret
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  // validates token is not empty
  if (!token) {
    const error = { error: "A token is required for authentication.", statuscode: HttpStatus.FORBIDDEN }
    return res.status(403).send(error);
  }

  // decodes the token with the secret to check if the token is valid
  try {
    const decoded = jwt.verify(token, (secret as jwt.Secret));
    req.user = decoded;
  } catch (err) {
    const error = { error: "Invalid Token.", statuscode: HttpStatus.UNAUTHORIZED }
    return res.status(401).send(error);
  }

  return next();
};

module.exports = verifyToken