import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { TemplateWhatsappSettings } from "src/entities"
import { Repository } from "typeorm"

@Injectable()
export class MysqlTemplate99Service {
	constructor(
		@InjectRepository(TemplateWhatsappSettings)
		private readonly template99Repository: Repository<TemplateWhatsappSettings>
	) {}

	async getStoreTemplate99(storeId: string) {
		return await this.template99Repository.findOne({
			where: { tiendasId: Number(storeId) }
		})
	}
}
