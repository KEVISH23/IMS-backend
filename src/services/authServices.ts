import { injectable } from "inversify";
import { responseMessage } from "../constants";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'
import { IUSERS } from "../interfaces";
import { ApiError } from "../utils";
import { User } from "../models";
@injectable()
export class AuthService{
    async registerService(data:IUSERS):Promise<void>{
        try {
            await User.create(data)
        } catch (error) {
            throw(error)
        }
    }

    async loginService(email:string,password:string):Promise<IUSERS|null>{
        try {
            const user:IUSERS|null = await User.findOne({email})
            if(!user){
                throw new ApiError(responseMessage.NOTREGISTERED,404)
            }
            const comparePass = bcrypt.compareSync(password,user.password)
            if(!comparePass){
                throw new ApiError(responseMessage.INVALID_CREDENTIALS,401)
            }
            if(user.token && user.token.length > 0){
                throw new ApiError(responseMessage.ALREADY_LOGGEDIN,400)
            }
            const {_id,role} = user
            const token = jwt.sign({_id,email,role},config.get("SECRET_KEY"))
            await User.findOneAndUpdate({email},{
                $set:{token}
            })
            const user1:IUSERS|null = await User.findOne({email})
            return user1

        } catch (error:any) {
            throw(error)
        }
    }

    
    async logoutService(_id:string):Promise<void>{
        try {
            await User.findByIdAndUpdate({_id},{
                $set:{token:""}
            })
        } catch (error) {
            throw(error)
        }
    }
}