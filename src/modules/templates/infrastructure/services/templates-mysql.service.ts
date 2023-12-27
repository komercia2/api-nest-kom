import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { IStoreInfo } from "@templates/domain/entities/websites"
import { Tiendas, VisitasTienda } from "src/entities"
import { TiendasInfo } from "src/entities/TiendasInfo"
import { Repository } from "typeorm"
import { Like } from "typeorm"

@Injectable()
export class MysqlTemplatesService {
	constructor(
		@InjectRepository(TiendasInfo) private readonly tiendasInfoRepository: Repository<TiendasInfo>,
		@InjectRepository(Tiendas) private readonly tiendasRepository: Repository<Tiendas>,
		@InjectRepository(VisitasTienda)
		private readonly visitasTiendaRepository: Repository<VisitasTienda>
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

	async incrementViews(storeId: number): Promise<boolean> {
		try {
			const storeExistis = await this.tiendasRepository.findOne({ where: { id: storeId } })

			if (!storeExistis) return false

			const storeViewsInfo = await this.visitasTiendaRepository.findOne({
				where: { tiendaId: storeId }
			})

			if (!storeViewsInfo) {
				await this.visitasTiendaRepository.save({
					tiendaId: storeId,
					numeroVisitas: 1,
					createdAt: new Date()
				})
				return true
			}

			const { numeroVisitas } = storeViewsInfo

			const viewsUpdated = await this.visitasTiendaRepository.update(
				{ tiendaId: storeId },
				{
					numeroVisitas: () => `${numeroVisitas + 1}`,
					updatedAt: () => `NOW()`
				}
			)

			if (!viewsUpdated.affected) return false

			return true
		} catch (error) {
			return false
		}
	}
}
