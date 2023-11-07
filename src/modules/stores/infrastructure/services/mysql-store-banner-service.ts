import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Banners } from "src/entities"
import { Repository } from "typeorm"

import { StoreBannerEntity } from "../../domain/entities"

@Injectable()
export class MySQLStoreBannerService {
	constructor(@InjectRepository(Banners) private readonly bannerRepository: Repository<Banners>) {}

	async getStoreBanners(storeId: number) {
		const banners = await this.bannerRepository
			.createQueryBuilder("banners")
			.where("banners.tienda = :storeId", { storeId })
			.select([
				"banners.rutaBanner",
				"banners.titulo",
				"banners.descripcion",
				"banners.redireccion"
			])
			.getMany()

		return banners.map(this.toEntity)
	}

	private toEntity = (banner: Banners): StoreBannerEntity => ({
		...banner
	})
}
