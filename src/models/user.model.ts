import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        trim:true,
        required:[true,'User must have a name']
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:[true,'Email is required']
    },
    password:{
        type:String,
        trim:true,
        required:[true,'Password is required']
    },
    role:{
        type:String,
        enum:['Admin','User'],
        required:[true,'Role is required']
    },
    token:{
        type:String,
        default:""
    }
},{
    timestamps:true
})
UserSchema.pre('save',function(next){
    if(this.password){
        const hashPassword = bcrypt.hashSync(this.password,10)
        this.password = hashPassword
        next()
    }
})
const User = mongoose.model('user',UserSchema)
export {User}