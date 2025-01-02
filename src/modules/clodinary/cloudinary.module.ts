import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Tiendas } from "src/entities"

import { ClodinaryService } from "./clodinary.service"

@Module({
	imports: [TypeOrmModule.forFeature([Tiendas])],
	providers: [ClodinaryService]
})
export class CloudinaryModule {}
