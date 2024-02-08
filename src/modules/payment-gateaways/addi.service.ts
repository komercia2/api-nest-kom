import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { StoreAddiCredentials } from "src/entities"
import { Repository } from "typeorm"

import { SaveAddiCredentialsDto } from "./dtos/save-addi-credentials.dto"

@Injectable()
export class AddiService {
	constructor(
		@InjectRepository(StoreAddiCredentials)
		private readonly storeAddiCredentialsRepository: Repository<StoreAddiCredentials>
	) {}

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
