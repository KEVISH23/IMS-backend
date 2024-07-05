import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import { responseMessage } from "../constants";
import { ApiError, errorHandler } from "../utils";
import config from 'config'
import jwt from 'jsonwebtoken'
export class AuthMiddleware extends BaseMiddleware {
    handler(req: Request, res: Response, next: NextFunction): void {
        try {
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) {
                throw new ApiError(responseMessage.TOKENNOTPROVIDED, 400)
            }
            jwt.verify(token.toString(), config.get("SECRET_KEY"), (err: any, decoded: any) => {
                if (err) {
                    throw new ApiError(responseMessage.TOKENINVALID, 401)
                }
                req.headers._id = decoded._id,
                    req.headers.role = decoded.role,

                    next()
            })
        } catch (error: any) {
            const response = errorHandler(error)
            res.json({ status: false, ...response })
        }
    }
}

