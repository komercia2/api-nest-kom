import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersInfo } from "src/entities"

import { TwilioController } from "./twilio.controller"
import { TwilioService } from "./twilio.service"

@Module({
	imports: [TypeOrmModule.forFeature([UsersInfo])],
	controllers: [TwilioController],
	providers: [TwilioService]
})
export class TwilioModule {}
