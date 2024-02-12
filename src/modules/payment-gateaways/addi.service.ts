import {
	BadRequestException,
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import axios, { AxiosError } from "axios"
import { Logger } from "nestjs-pino"
import { StoreAddiCredentials } from "src/entities"
import { Repository } from "typeorm"

import { CreateAddiApplicationDto } from "./dtos/create-addi-application.dto"
import { AddiPaymentDto } from "./dtos/env.dto"
import { GetAddiOAuthTokenDto } from "./dtos/get-addi-oauth-token.dto"
import { SaveAddiCredentialsDto } from "./dtos/save-addi-credentials.dto"
import { AddiUtils } from "./utils/addi-utils"

@Injectable()
export class AddiService {
	private readonly ADDI_V1_STAGING_APP_URL = "https://api.addi-staging.com/v1/online-applications"
	private readonly ADDI_V1_STAGING_OAUTH_URL = "https://auth.addi-staging.com/oauth/token"

	constructor(
		@InjectRepository(StoreAddiCredentials)
		private readonly storeAddiCredentialsRepository: Repository<StoreAddiCredentials>,
		private readonly logger: Logger,
		private readonly addiUtils: AddiUtils,
		private readonly configService: ConfigService
	) {}

	async createAddiApplication(
		createAddiApplicationDto: CreateAddiApplicationDto,
		addiPaymentDto: AddiPaymentDto
	) {
		const { env, storeId } = addiPaymentDto

		const storeAddiCredentials = await this.getStoreCredentials(storeId)
		const audience = this.addiUtils.getAudience(
			env,
			this.configService.get<string>("ADDI_STAGING_AUDIENCE") ?? "",
			this.configService.get<string>("ADDI_PRODUCTION_AUDIENCE") ?? ""
		)

		const credentials = await this.getAddiOAuthToken({
			audience: audience as string,
			client_id: storeAddiCredentials.clientID,
			client_secret: storeAddiCredentials.clientSecret
		})

		try {
			const response = await axios.post(this.ADDI_V1_STAGING_APP_URL, createAddiApplicationDto, {
				maxRedirects: this.addiUtils.maxRedirects,
				validateStatus: this.addiUtils.validateStatus,
				headers: {
					Authorization: `Bearer ${credentials.access_token}`,
					"Content-Type": "application/json"
				}
			})

			if (this.addiUtils.isRedirect(response.status)) {
				const location = response.headers.location
				return { location }
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				const { response } = error
				if (response?.status && this.addiUtils.isBadRequest(response.status)) {
					throw new BadRequestException(response.data)
				}
				if (response?.status && this.addiUtils.isConflict(response.status)) {
					throw new ConflictException(response.data)
				}
				if (response?.status && this.addiUtils.isServerError(response.status)) {
					throw new InternalServerErrorException(response.data)
				}

				this.logger.error(error)
				throw new InternalServerErrorException("Error creating addi application")
			}
			this.logger.error(error)
			throw new InternalServerErrorException("Error creating addi application")
		}
	}

	async getAddiOAuthToken(getAddiOAuthTokenDto: GetAddiOAuthTokenDto) {
		try {
			const response = await axios.post<{ access_token: string }>(this.ADDI_V1_STAGING_OAUTH_URL, {
				grant_type: "client_credentials",
				...getAddiOAuthTokenDto
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
