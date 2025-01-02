import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Tiendas } from "src/entities"
import { Repository } from "typeorm"

import { StoreLogoEntity } from "../../domain/entities"

@Injectable()
export class MySQLStoreLogoService {
	constructor(
		@InjectRepository(Tiendas)
		private readonly storeRepository: Repository<Tiendas>
	) {}

	async findStoreLogo(storeId: number): Promise<StoreLogoEntity | null> {
		const store = await this.storeRepository.findOne({ where: { id: storeId } })

		if (!store) return null

		const { logo: identifier, logoMigrated: migrated, cloudinaryLogo } = store

		const logo = (migrated && cloudinaryLogo) || `https://api2.komercia.co/logos/${identifier}`
		const logoMigrated = migrated || false

		return StoreLogoEntity.create(identifier, logo, logoMigrated)
	}
}
