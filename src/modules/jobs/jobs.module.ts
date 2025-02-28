import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Tiendas } from "src/entities"

import { CloudinaryModule } from "../clodinary/cloudinary.module"
import { MailsModule } from "../mails/mails.module"
import { JobsService } from "./jobs.service"

@Module({
	imports: [TypeOrmModule.forFeature([Tiendas]), MailsModule, CloudinaryModule],
	providers: [JobsService]
})
export class JobsModule {}
