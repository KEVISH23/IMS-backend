import { Request, Response } from "express";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { responseMessage, TYPES } from "../constants";
import { errorHandler } from "../utils";
import { inject } from "inversify";
import { ICATEGORY } from "../interfaces/ICategory";
import { CategoryService } from "../services";

@controller('/category',TYPES.AuthMiddleware)
export class CategoryController{
    constructor(
        @inject<CategoryService>(TYPES.CategoryService) private categoryService:CategoryService
    ){}
    @httpPost('/',TYPES.RoleMiddleware)
    async addCategory(req:Request,res:Response):Promise<void>{
        try {
            const {categoryName} = req.body as ICATEGORY
            await this.categoryService.addCategory({categoryName})
            res.json({status:true,message:'Category Added',statusCode:201})
        } catch (error) {
            const response = errorHandler(error)
            res.json({status:false,...response})
        }
    }
    @httpGet('/:id',TYPES.RoleMiddleware)
    async getParticularCategory(req:Request,res:Response):Promise<void>{
        try {
            const {id} = req.params
            const data:ICATEGORY|null = await this.categoryService.getParticularCategory(id as string)
            res.json({status:true,data,statusCode:200})
        } catch (error) {
            const response = errorHandler(error)
            res.json({status:false,...response})
        }
    }
    @httpGet('/')
    async getAllCategories(req:Request,res:Response):Promise<void>{
        try {
            const {id} = req.params
            const data:ICATEGORY[] = await this.categoryService.getAllCategories()
            res.json({status:true,data,statusCode:200})
        } catch (error) {
            const response = errorHandler(error)
            res.json({status:false,...response})
        }
    }
    @httpPut('/:id',TYPES.RoleMiddleware)
    async updateCategory(req:Request,res:Response):Promise<void>{
        try {
            const {id} = req.params
            const {categoryName} = req.body as ICATEGORY
            await this.categoryService.updateCategory(id as string,{categoryName})
            res.json({status:true,message:'Category Updated',statusCode:200})
        } catch (error) {
            const response = errorHandler(error)
            res.json({status:false,...response})
        }
    }
    @httpDelete('/:id',TYPES.RoleMiddleware)
    async deleteCategory(req:Request,res:Response):Promise<void>{
        try {
            const {id} = req.params
            await this.categoryService.deleteCategory(id as string)
            res.json({status:true,message:'Category Deleted',statusCode:200})
        } catch (error) {
            const response = errorHandler(error)
            res.json({status:false,...response})
        }
    }

    
}