import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Tiendas } from "src/entities"

import { MailsModule } from "../mails/mails.module"
import { JobsService } from "./jobs.service"

@Module({
	imports: [TypeOrmModule.forFeature([Tiendas]), MailsModule],
	providers: [JobsService]
})
export class JobsModule {}
