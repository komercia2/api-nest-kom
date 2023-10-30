import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Template_5Settings } from "src/entities"
import { Repository } from "typeorm"

@Injectable()
export class MysqlTemplate5Service {
	constructor(
		@InjectRepository(Template_5Settings)
		private readonly template_5SettingsRepository: Repository<Template_5Settings>
	) {}

	async getStoreTemplate5(storeId: string) {
		return await this.template_5SettingsRepository.findOne({
			where: { tiendasId: Number(storeId) }
		})
	}
}
