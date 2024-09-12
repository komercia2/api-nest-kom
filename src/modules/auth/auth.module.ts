import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Tiendas, Users } from "src/entities"

import { AuthService } from "./auth.service"
import { StoresAuthController } from "./stores-auth.controller"
import { AuthController } from "./super.auth.controller"

@Module({
	imports: [TypeOrmModule.forFeature([Users, Tiendas])],
	controllers: [AuthController, StoresAuthController],
	providers: [AuthService]
})
export class AuthModule {}
