import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Tiendas } from "src/entities"

import { ClodinaryService } from "./clodinary.service"
import { CloudinaryController } from "./cloudinary.controller"

@Module({
	imports: [TypeOrmModule.forFeature([Tiendas])],
	providers: [ClodinaryService],
	controllers: [CloudinaryController],
	exports: [ClodinaryService]
})
export class CloudinaryModule {}
