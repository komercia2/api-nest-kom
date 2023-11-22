import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { LaravelAuthMiddleware } from "@shared/infrastructure/middlewares/auth"

import { ApplicationInjectionTokens } from "./application/application-injection.tokens"
import {
	GetEditorSettingSuggestionsQuery,
	getProductDescriptionSuggestionsFromKeywordsQuery
} from "./application/query"
import { ProductSuggetionsController } from "./infrastructure/controllers"
import { EditorSettingSuggetionsController } from "./infrastructure/controllers"
import { InfrastructureInjectionTokens } from "./infrastructure/infrastructure-injection.token"
import { OpenAIProductSuggetionsRepository } from "./infrastructure/repository"
import { OpenAIEditorSuggetionsRepository } from "./infrastructure/repository"
import { OpenAIProducSuggetionsServices } from "./infrastructure/services"

const providers = [
	{
		provide: InfrastructureInjectionTokens.OpenAIProducSuggetionsServices,
		useClass: OpenAIProducSuggetionsServices
	},
	{
		provide: InfrastructureInjectionTokens.getProductDescriptionSuggestionsFromKeywordsQuery,
		useClass: getProductDescriptionSuggestionsFromKeywordsQuery
	},
	{
		provide: ApplicationInjectionTokens.IProductDescriptionSuggetionRepository,
		useClass: OpenAIProductSuggetionsRepository
	},
	{
		provide: InfrastructureInjectionTokens.GetEditorSettingSuggestionsQuery,
		useClass: GetEditorSettingSuggestionsQuery
	},
	{
		provide: ApplicationInjectionTokens.IEditorSuggetionsRepository,
		useClass: OpenAIEditorSuggetionsRepository
	}
]

@Module({
	providers: [...providers],
	controllers: [ProductSuggetionsController, EditorSettingSuggetionsController]
})
export class AiSuggetionsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LaravelAuthMiddleware)
			.forRoutes(ProductSuggetionsController, EditorSettingSuggetionsController)
	}
}
