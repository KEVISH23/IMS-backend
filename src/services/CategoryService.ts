import { injectable } from "inversify";
import { ICATEGORY } from "../interfaces/ICategory";
import { Category, Product } from "../models";
import { ApiError } from "../utils";

@injectable()
export class CategoryService{
    async addCategory(categoryName:ICATEGORY):Promise<void>{
        try {
            await Category.create(categoryName)
        } catch (error) {
            throw(error)
        }
    }
    async getParticularCategory(id:string):Promise<ICATEGORY|null>{
        try {
            return await Category.findById(id)
        } catch (error) {
            throw(error)
        }
    }
    async getAllCategories():Promise<ICATEGORY[]>{
        try {
            return await Category.find()
        } catch (error) {
            throw(error)
        }
    }
    async updateCategory(id:string,data:ICATEGORY):Promise<void>{
        try {
            await Category.findByIdAndUpdate(id,data)
        } catch (error) {
            throw(error)
        }
    }
    async deleteCategory(id:string):Promise<void>{
        try {
            const data = await Product.find({categoryId:id})
            if(data.length>0){
                throw new ApiError('Product exists of this category so you cant delete',400)
            }
             await Category.findByIdAndDelete(id)
        } catch (error) {
            throw(error)
        }
    }
}