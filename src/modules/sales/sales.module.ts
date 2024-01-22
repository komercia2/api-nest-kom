import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Carritos } from "src/entities"

import { PrivateSalesController } from "./private-sales.controller"
import { SalesService } from "./sales.service"

@Module({
	imports: [TypeOrmModule.forFeature([Carritos])],
	controllers: [PrivateSalesController],
	providers: [SalesService]
})
export class SalesModule {}
