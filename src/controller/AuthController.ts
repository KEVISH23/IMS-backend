import { Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import { responseMessage, TYPES } from "../constants";
import { errorHandler } from "../utils";
import { inject } from "inversify";
import { AuthService } from "../services/";
import { IUSERS } from "../interfaces";
@controller('/auth')
export class AuthController {
    constructor(
        @inject<AuthService>(TYPES.AuthService) private authService:AuthService
    ) { }
    @httpPost('/register')
    async registerUser(req:Request,res:Response):Promise<void>{
        try {
            const {email,userName,password,role} = req.body as IUSERS
            await this.authService.registerService({email,userName,password,role})
            res.json({status:true,message:responseMessage.CREATED,statusCode:201})
        } catch (error) {
            const response = errorHandler(error)
            res.json({status:false,...response})
        }
    }

    @httpPost('/login')
    async loginUser(req:Request,res:Response):Promise<void>{
        try{
            const {email,password} = req.body
            const data:IUSERS|null = await this.authService.loginService(email,password)
            res.json({status:true,data,message:responseMessage.LOGGEDIN,statusCode:200})
        }catch(error:any){
            const response = errorHandler(error)
            res.json({status:false,...response})
        }
    }

    @httpPost('/logout',TYPES.AuthMiddleware)
    async logout(req:Request,res:Response):Promise<void>{
        try{
            const _id  = req.headers._id as string
            await this.authService.logoutService(_id)
            res.json({status:true,message:responseMessage.LOGGEDOUT,statusCode:200})
        }catch(error:any){
            const response = errorHandler(error)
            res.json({status:false,...response})
        }
    }
}