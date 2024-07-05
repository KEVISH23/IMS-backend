import { injectable } from "inversify";
import { IPRODUCTS } from "../interfaces";
import { Product } from "../models";
import { getProductsPipeline } from "../utils";
import mongoose, { PipelineStage } from "mongoose";

@injectable()
export class ProductService{
    async addProduct(data:IPRODUCTS):Promise<void>{
        try {
            await Product.create(data)
        } catch (error) {
            throw(error)
        }
    }
    async getProductById(id:string):Promise<IPRODUCTS[]>{
        try {
            const pipeline:PipelineStage[] = [
                {
                    $match:{
                        _id:new mongoose.Types.ObjectId(id)
                    }
                },
                ...getProductsPipeline
            ]
            return await Product.aggregate(pipeline)
        } catch (error) {
            throw(error)
        }
    }
    async updateProduct(id:string,data:IPRODUCTS):Promise<void>{
        try {
            await Product.findByIdAndUpdate(id,data)
        } catch (error) {
            throw(error)
        }
    }
    async deleteProduct(id:string):Promise<void>{
        try {
            await Product.findByIdAndDelete(id)
        } catch (error) {
            throw(error)
        }
    }
    async getAllProducts(search:string):Promise<IPRODUCTS[]>{
        try {
            const pipeline:PipelineStage[] = [...getProductsPipeline]
            search && search.toString().trim() !==""?pipeline.push({
                $match:{
                    
                        $or:["categoryName","title","description"].map((ele)=>{
                            return({[ele]:{$regex:search,$options:'i'}})
                        })
                    
                }
            }):null
            return await Product.aggregate(pipeline)
        } catch (error) {
            throw(error)
        }
    }
}