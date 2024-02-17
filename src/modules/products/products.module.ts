import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { MulterModule } from "@nestjs/platform-express"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LaravelAuthMiddleware } from "@shared/infrastructure/middlewares/auth"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { Productos, ProductosInfo, VisitaProducto } from "src/entities"

import { ProductsApplicationInjectionTokens } from "./application/application-injection-tokens"
import { CreateFromFileCommand } from "./application/command"
import {
	GetManyByIdsQuery,
	GetPaginatedProductsQuery,
	GetProductBySlugQuery
} from "./application/query"
import { GetProductDescriptionQuery } from "./application/query/get-product-description.query"
import { AdminProductController, ProductController } from "./infrastructure/controllers"
import { InfrastructureInjectionTokens } from "./infrastructure/infrastructure-injection-tokens"
import { MySQLProductService, XlsxProductService } from "./infrastructure/services"

const application = [
	{
		provide: InfrastructureInjectionTokens.GetPaginatedProductsQuery,
		useClass: GetPaginatedProductsQuery
	},
	{
		provide: InfrastructureInjectionTokens.GetProductBySlugQuery,
		useClass: GetProductBySlugQuery
	},
	{
		provide: InfrastructureInjectionTokens.CreateFromFileCommand,
		useClass: CreateFromFileCommand
	},
	{
		provide: InfrastructureInjectionTokens.GetManyByIdsQuery,
		useClass: GetManyByIdsQuery
	},
	{
		provide: InfrastructureInjectionTokens.GetProductDescriptionQuery,
		useClass: GetProductDescriptionQuery
	}
]

const infrastructure = [
	{
		provide: InfrastructureInjectionTokens.MySQLProductService,
		useClass: MySQLProductService
	},
	{
		provide: ProductsApplicationInjectionTokens.IProductRepository,
		useClass: MySQLProductService
	},
	{
		provide: InfrastructureInjectionTokens.XlsxProductService,
		useClass: XlsxProductService
	}
]

@Module({
	imports: [
		TypeOrmModule.forFeature([Productos, VisitaProducto, ProductosInfo]),
		MulterModule.register()
	],
	controllers: [ProductController, AdminProductController],
	providers: [...application, ...infrastructure]
})
export class ProductModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(PublicApiKeyAuthMiddleware).forRoutes(ProductController)
		consumer.apply(LaravelAuthMiddleware).forRoutes(AdminProductController)
	}
}
