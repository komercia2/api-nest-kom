import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Productos } from "src/entities"
import { Repository } from "typeorm"

@Injectable()
export class MySQLProductService {
	constructor(
		@InjectRepository(Productos) private readonly productRepository: Repository<Productos>
	) {}

	async getPagedProducts(storeId: number, page: number, limit: number, active: boolean) {
		return await this.productRepository.find({
			skip: page,
			take: limit,
			where: { tienda: storeId, activo: active },
			relations: [
				"categoriaProducto2",
				"productosVariantes.productosVariantesCombinaciones",
				"tagProducts"
			]
		})
	}
}
