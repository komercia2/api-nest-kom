import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { MailService } from "@sendgrid/mail"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { MensajesContacto } from "src/entities"

import { MailsController } from "./mails.controller"
import { MailsService } from "./mails.service"

@Module({
	imports: [TypeOrmModule.forFeature([MensajesContacto])],
	controllers: [MailsController],
	providers: [MailsService, MailService]
})
export class MailsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(PublicApiKeyAuthMiddleware).forRoutes(MailsController)
	}
}
