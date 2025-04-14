import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Tiendas, UserPasswordReset, Users, UsersInfo } from "src/entities"

import { ClodinaryService } from "../clodinary/clodinary.service"
import { MailsModule } from "../mails/mails.module"
import { AuthService } from "./auth.service"
import { StoresAuthController } from "./stores-auth.controller"
import { AuthController } from "./super.auth.controller"

@Module({
	imports: [TypeOrmModule.forFeature([Users, Tiendas, UsersInfo, UserPasswordReset]), MailsModule],
	controllers: [AuthController, StoresAuthController],
	providers: [AuthService, ClodinaryService]
})
export class AuthModule {}
