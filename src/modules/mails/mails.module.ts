import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { MailService } from "@sendgrid/mail"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"

import { MailsController } from "./mails.controller"
import { MailsService } from "./mails.service"

@Module({
	controllers: [MailsController],
	providers: [MailsService, MailService]
})
export class MailsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(PublicApiKeyAuthMiddleware).forRoutes(MailsController)
	}
}
