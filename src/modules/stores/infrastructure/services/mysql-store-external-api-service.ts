import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { ApisConexiones } from "src/entities"
import { Repository } from "typeorm"

@Injectable()
export class MySQLStoreExternalApiService {
	constructor(
		@InjectRepository(ApisConexiones)
		private readonly storeExternalApiRepository: Repository<ApisConexiones>
	) {}

	async getStoreExternalApis(storeId: number) {
		return await this.storeExternalApiRepository.findOne({
			where: { tiendaId: storeId }
		})
	}
}
