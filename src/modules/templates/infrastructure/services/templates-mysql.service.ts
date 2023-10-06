import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { IStoreInfo } from "@templates/domain/entities/websites"
import { Tiendas } from "src/entities"
import { TiendasInfo } from "src/entities/TiendasInfo"
import { Repository } from "typeorm"
import { Like } from "typeorm"

@Injectable()
export class MysqlTemplatesService {
	constructor(
		@InjectRepository(TiendasInfo) private readonly tiendasInfoRepository: Repository<TiendasInfo>,
		@InjectRepository(Tiendas) private readonly tiendasRepository: Repository<Tiendas>
	) {}

	async findMySQLTemplateByCriteria(
		criteria: string,
		isDomain: boolean
	): Promise<IStoreInfo | null> {
		const subdomainSearched = this.tiendasRepository.findOne({ where: { subdominio: criteria } })

		const domainSearched = this.tiendasInfoRepository.findOne({
			where: { dominio: Like(`%${criteria}%`) }
		})

		const [subdomain, domain] = await Promise.allSettled([subdomainSearched, domainSearched])

		if (domain.status === "fulfilled" && domain.value && isDomain) {
			const { tiendaInfo } = domain.value
			const info = await this.tiendasRepository.findOne({ where: { id: tiendaInfo } })

			if (!info) return null
			const { template } = info

			return { id: tiendaInfo, template }
		}
		if (subdomain.status === "fulfilled" && subdomain.value) {
			const { id, template } = subdomain.value
			return { id, template }
		}

		return null
	}
}
