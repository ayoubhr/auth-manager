import jwt from "jsonwebtoken"
import { IGetUserAuthInfoRequest } from "../../model/domain/interfaces";
import { Response, NextFunction } from 'express'

function verifyToken(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): void | Response<any> {
  const secret = process.env.token_secret
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    const error = { error: "A token is required for authentication.", statuscode: "403. Forbidden." }
    return res.status(403).send(error);
  }

  try {
    const decoded = jwt.verify(token, (secret as jwt.Secret));
    req.user = decoded;
  } catch (err) {
    const error = { error: "Invalid Token.", statuscode: "401. Unauthorized." }
    return res.status(401).send(error);
  }

  return next();
};

module.exports = verifyToken