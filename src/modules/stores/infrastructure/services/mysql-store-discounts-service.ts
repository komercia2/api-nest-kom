import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DescuentoRango } from "src/entities"
import { Repository } from "typeorm"

@Injectable()
export class MySQLStoreDiscountService {
	constructor(
		@InjectRepository(DescuentoRango)
		private readonly storeDiscountRepository: Repository<DescuentoRango>
	) {}

	async getDiscountsByStoreId(storeId: number) {
		return await this.storeDiscountRepository.find({
			where: { tiendasId: storeId },
			order: { createdAt: "DESC" }
		})
	}
}
