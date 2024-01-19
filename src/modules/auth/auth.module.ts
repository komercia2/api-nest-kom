import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Users } from "src/entities"

import { AuthService } from "./auth.service"
import { AuthController } from "./super.auth.controller"

@Module({
	imports: [TypeOrmModule.forFeature([Users])],
	controllers: [AuthController],
	providers: [AuthService]
})
export class AuthModule {}
