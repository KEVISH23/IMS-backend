import {Container} from 'inversify'
import { AuthService, CategoryService } from './services/'
const container = new Container()
import {TYPES} from './constants'
import { AuthMiddleware , RoleMiddleware} from './middleware/'
import { ProductService } from './services/ProductService'

//binding services
container.bind<AuthService>(TYPES.AuthService).to(AuthService)
container.bind<CategoryService>(TYPES.CategoryService).to(CategoryService)
container.bind<ProductService>(TYPES.ProductService).to(ProductService)
//binding middlewares
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)
container.bind<RoleMiddleware>(TYPES.RoleMiddleware).to(RoleMiddleware)
export {container}