import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Productos } from "src/entities"

import { ProductsApplicationInjectionTokens } from "./application/application-injection-tokens"
import { GetPaginatedProductsQuery } from "./application/query"
import { ProductController } from "./infrastructure/controllers"
import { InfrastructureInjectionTokens } from "./infrastructure/infrastructure-injection-tokens"
import { MySQLProductService } from "./infrastructure/services"

const application = [
	{
		provide: InfrastructureInjectionTokens.GetPaginatedProductsQuery,
		useClass: GetPaginatedProductsQuery
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
	}
]

@Module({
	imports: [TypeOrmModule.forFeature([Productos])],
	controllers: [ProductController],
	providers: [...application, ...infrastructure]
})
export class ProductModule {}
