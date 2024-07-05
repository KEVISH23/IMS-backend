import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true,'Product must have a title']
    },
    description:{
        type:String,
        trim:true,
        required:[true,'Product must have a description']
    },
    price:{
        type:Number,
        trim:true,
        required:[true,'Product must have a price']
    },
    imagePath:{
        type:String,
        trim:true,
        required:[true,'Product must have a Photo']
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        trim:true,
        required:[true,'Product must have a category'],
        ref:'category'
    },
},{
    timestamps:true
})

const Product = mongoose.model('product',ProductSchema)
export {Product}