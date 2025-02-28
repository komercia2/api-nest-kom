import { Injectable, NotFoundException } from "@nestjs/common"
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
	async syncStoreLogo(storeID: number) {
		const store = await this.tiendasRepository.findOne({ where: { id: storeID } })

		if (!store) {
			this.logger.warn(`Store with ID ${storeID} not found`)
			throw new NotFoundException(`Store with ID ${storeID} not found`)
		}

		const { id, logo, cloudinaryLogo, logoMigrated } = store
		if (logoMigrated && cloudinaryLogo) {
			this.logger.log(`Store with ID ${id} already has a migrated logo, overwriting...`)
		} else if (logo) {
			this.logger.warn(`Store with ID ${id} already has a logo but is not migrated`)
		} else {
			this.logger.warn(`Store with ID ${id} has no logo`)
		}

		try {
			const { secure_url } = await this.upload(
				`https://api2.komercia.co/logos/${logo}`,
				"logos",
				id.toString()
			)
			await this.tiendasRepository.update(id, { cloudinaryLogo: secure_url, logoMigrated: true })
			this.logger.log(`Logo for store with ID ${id} uploaded successfully`)
			return { id, secure_url }
		} catch (error) {
			this.logger.error(`Failed to upload logo for store with ID ${id}: ${error}`)
			throw new Error(`Logo upload failed for store with ID ${id}`)
		}
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
				"logos",
				id.toString()
			)
			await this.tiendasRepository.update(id, { cloudinaryLogo: secure_url, logoMigrated: true })
		} catch (error) {
			this.logger.error(`Error migrating logo for store with ID ${id}: ${error}`)
		}
	}
	upload(filePath: string, folder: string, public_id?: string) {
		return cloudinary.uploader.upload(filePath, {
			folder,
			public_id,
			overwrite: true,
			invalidate: true
		})
	}
}
