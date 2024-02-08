import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import axios from "axios"
import { Logger } from "nestjs-pino"
import { StoreAddiCredentials } from "src/entities"
import { Repository } from "typeorm"

import { SaveAddiCredentialsDto } from "./dtos/save-addi-credentials.dto"

@Injectable()
export class AddiService {
	constructor(
		@InjectRepository(StoreAddiCredentials)
		private readonly storeAddiCredentialsRepository: Repository<StoreAddiCredentials>,

		private readonly logger: Logger
	) {}

	async getStagingAddiOAuth() {
		try {
			const response = await axios.post("https://auth.addi-staging.com/oauth/token", {
				audience: "https://api.staging.addi.com",
				grant_type: "client_credentials",
				client_id: "y61CPhOS0YB7wxz8BgKBpQt4YcTsW0wi",
				client_secret: "U6zgGfhZ_F-HLbqyM70fkssviIQ2PDL34phvGIL4wIppfoSXv-z63mrldcrnUZUi"
			})

			return response.data
		} catch (error) {
			this.logger.error(error)
			throw new InternalServerErrorException("Error getting staging addi oauth")
		}
	}

	async activateIntegration(storeId: number) {
		const credentials = await this.findStoreCredentials(storeId)

		if (!credentials) throw new ConflictException("Integration credentials not found")

		credentials.deletedAt = null
		credentials.updatedAt = new Date()
		await this.storeAddiCredentialsRepository.save(credentials)

		return { message: "Integration activated successfully" }
	}

	async deactivateIntegration(storeId: number) {
		const credentials = await this.findStoreCredentials(storeId)

		if (!credentials) throw new NotFoundException("No credentials found for this store")

		credentials.deletedAt = new Date()
		await this.storeAddiCredentialsRepository.save(credentials)

		return { message: "Integration deactivated successfully" }
	}

	async saveAddiCredentials(saveAddiCredentialsDto: SaveAddiCredentialsDto) {
		const { storeId } = saveAddiCredentialsDto

		const existingCredentials = await this.findStoreCredentials(storeId)

		if (existingCredentials) throw new ConflictException("Credentials already exist for this store")

		const credentials = this.buildAddiCredentials(saveAddiCredentialsDto)
		await this.storeAddiCredentialsRepository.save(credentials)

		return { message: "Credentials saved successfully" }
	}

	async getStoreCredentials(storeId: number) {
		const credentials = await this.findStoreCredentials(storeId)

		if (!credentials) throw new NotFoundException("No credentials found for this store")

		return credentials
	}

	async findStoreCredentials(storeId: number) {
		return this.storeAddiCredentialsRepository.findOne({ where: { storeId }, withDeleted: true })
	}

	buildAddiCredentials(saveAddiCredentialsDto: SaveAddiCredentialsDto) {
		const credentials = new StoreAddiCredentials()
		credentials.storeId = saveAddiCredentialsDto.storeId
		credentials.clientID = saveAddiCredentialsDto.clientID
		credentials.clientSecret = saveAddiCredentialsDto.clientSecret
		credentials.ally_slug = saveAddiCredentialsDto.ally_slug
		credentials.createdAt = new Date()

		return credentials
	}
}
