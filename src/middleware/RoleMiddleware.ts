import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import { ApiError, errorHandler } from "../utils";

export class RoleMiddleware extends BaseMiddleware{
    handler(req: Request, res: Response, next: NextFunction): void {
        try {
            if(req.headers.role === 'Admin'){
                next()
            }else{
                throw new ApiError('Not Authorized',401)
            }
        } catch (error) {
            const response = errorHandler(error)
            res.json({status:false,...response})
        }
        
    }
    
}