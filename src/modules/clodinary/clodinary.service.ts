import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { v2 as cloudinary } from "cloudinary"
import { Logger } from "nestjs-pino"
import { Tiendas } from "src/entities"
import { Repository } from "typeorm"
@Injectable()
export class ClodinaryService {
	constructor(
		private configService: ConfigService,
		@InjectRepository(Tiendas) private readonly tiendasRepository: Repository<Tiendas>,
		private readonly logger: Logger
	) {
		cloudinary.config({
			cloud_name: this.configService.get<string>("CLOUDINARY_CLOUD_NAME"),
			api_key: this.configService.get<string>("CLOUDINARY_API_KEY"),
			api_secret: this.configService.get<string>("CLOUDINARY_API_SECRET")
		})
	}

	async migrateNewStoreLogo(storeID: number) {
		const store = await this.tiendasRepository.findOne({ where: { id: storeID } })

		if (!store) {
			this.logger.warn(`Store with ID ${storeID} not found`)
			return
		}

		const { id, logo } = store

		if (!logo) {
			this.logger.warn(`Store with ID ${id} has no logo`)
			return
		}

		this.logger.log(`Migrating logo for store with ID ${id} identified as ${logo}`)

		try {
			const { secure_url } = await this.upload(
				`https://api2.komercia.co/logos/logo_nuevas_tiendas.png`,
				"logos"
			)
			await this.tiendasRepository.update(id, { cloudinaryLogo: secure_url, logoMigrated: true })
		} catch (error) {
			this.logger.error(`Error migrating logo for store with ID ${id}: ${error}`)
		}
	}

	upload(filePath: string, folder: string, overwrite = true) {
		return cloudinary.uploader.upload(filePath, { folder, overwrite })
	}
}
