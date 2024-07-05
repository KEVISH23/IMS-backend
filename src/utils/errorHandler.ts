import { ApiError } from "./ApiError"

export const errorHandler = (err:any):{message:string,statusCode:number} => {
    let message = ''
    if(err instanceof ApiError){
        return {message:err.message,statusCode:err.statusCode}
    }
    if(err.code === 11000){
        return {message:"Email already registered",statusCode:400}
    }
    if(err.name === 'CastError'){
        return {message:`provided ID(s) are not valid `,statusCode:400}
    }
    if(err.name === 'ValidationError'){
        for (const key in err.errors) {
            if(err.errors[key].name === "CastError"){
                message += `Id provided at ${err.errors[key].path} is not valid!!!`
            }else{
                message += err.errors[key].message
                message += ', '
            }
        }
        return {message:message.slice(0,message.length -2),statusCode:400}
    }
    return {message:err.message,statusCode:500}
}