import {
	BadRequestException,
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { PusherNotificationsService } from "@shared/infrastructure/services"
import axios, { AxiosError } from "axios"
import { Logger } from "nestjs-pino"
import { ApisConexiones, Carritos, StoreAddiCredentials } from "src/entities"
import { Repository } from "typeorm"

import { CancelAddiApplicationDto } from "./dtos/cancel-addi-application.dto"
import { CreateAddiApplicationDto } from "./dtos/create-addi-application.dto"
import { AddiPaymentDto } from "./dtos/env.dto"
import { GetAddiOAuthTokenDto } from "./dtos/get-addi-oauth-token.dto"
import { SaveAddiCredentialsDto } from "./dtos/save-addi-credentials.dto"
import { AddiUtils } from "./utils/addi-utils"

@Injectable()
export class AddiService {
	private readonly ADDI_V1_STAGING_APP_URL = "https://api.addi-staging.com/v1/online-applications"
	private readonly ADDI_V1_STAGING_OAUTH_URL = "https://auth.addi-staging.com/oauth/token"
	private readonly ADDI_V1_PRODUCTION_OAUTH_URL = "https://auth.addi.com/oauth/token"
	private readonly ADDI_V1_STAGING_CANCEL_URL =
		"https://api.addi-staging.com/v1/online-applications/cancellations"
	private readonly ADDI_V1_PRODUCTION_CANCEL_URL =
		"https://api.addi.com/v1/online-applications/cancellations"

	constructor(
		@InjectRepository(StoreAddiCredentials)
		private readonly storeAddiCredentialsRepository: Repository<StoreAddiCredentials>,
		@InjectRepository(ApisConexiones)
		private readonly apisConexionesRepository: Repository<ApisConexiones>,
		@InjectRepository(Carritos) private readonly carritosRepository: Repository<Carritos>,
		private readonly logger: Logger,
		private readonly addiUtils: AddiUtils,
		private readonly configService: ConfigService,
		private readonly pusherNotificationService: PusherNotificationsService
	) {}

	async cancelAddiApplication(cancelAddiApplicationDto: CancelAddiApplicationDto) {
		const { orderId, amount, environment, storeId } = cancelAddiApplicationDto

		const storeAddiCredentials = await this.getStoreCredentials(storeId)

		const audience = this.addiUtils.getAudience(
			environment,
			this.configService.get<string>("ADDI_STAGING_AUDIENCE") ?? "",
			this.configService.get<string>("ADDI_PRODUCTION_AUDIENCE") ?? ""
		)

		const credentials = await this.getAddiOAuthToken(
			{
				audience: audience as string,
				client_id: storeAddiCredentials.clientID,
				client_secret: storeAddiCredentials.clientSecret
			},
			environment
		)

		try {
			const response = await axios.post(
				environment === "STAGING"
					? this.ADDI_V1_STAGING_CANCEL_URL
					: this.ADDI_V1_PRODUCTION_CANCEL_URL,
				{ orderId, amount },
				{
					headers: {
						Authorization: `Bearer ${credentials.access_token}`,
						"Content-Type": "application/json"
					}
				}
			)

			if (response.status === 201) {
				await Promise.all([
					this.carritosRepository.update({ id: orderId }, { estado: "3" }),
					this.pusherNotificationService.trigger(`store-${storeId}`, "payment-status", {
						orderId,
						amount
					})
				])
				return { message: "Application canceled successfully" }
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
				throw new InternalServerErrorException("Error canceling addi application")
			}
			this.logger.error(error)
			throw new InternalServerErrorException("Error canceling addi application")
		}
	}

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

		const credentials = await this.getAddiOAuthToken(
			{
				audience: audience as string,
				client_id: storeAddiCredentials.clientID,
				client_secret: storeAddiCredentials.clientSecret
			},
			env
		)

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

	async getAddiOAuthToken(getAddiOAuthTokenDto: GetAddiOAuthTokenDto, env: string) {
		try {
			const response = await axios.post<{ access_token: string }>(
				env === "STAGING" ? this.ADDI_V1_STAGING_OAUTH_URL : this.ADDI_V1_PRODUCTION_OAUTH_URL,
				{
					grant_type: "client_credentials",
					...getAddiOAuthTokenDto
				}
			)

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
		const apiConnection = await this.getApiConnection(storeId)

		if (!apiConnection) throw new NotFoundException("No api connection found for this store")

		apiConnection.addiAllySlug = saveAddiCredentialsDto.ally_slug
		apiConnection.updatedAt = new Date()

		await Promise.all([
			await this.storeAddiCredentialsRepository.save(credentials),
			await this.apisConexionesRepository.save(apiConnection)
		])

		return { message: "Credentials saved successfully" }
	}

	async getStoreIdFromCartId(cartId: number) {
		const cart = await this.carritosRepository.findOne({ where: { id: cartId } })

		if (!cart) throw new NotFoundException("Cart not found")

		return cart.tienda
	}

	async getStoreCredentials(storeId: number) {
		const credentials = await this.findStoreCredentials(storeId)

		if (!credentials) throw new NotFoundException("No credentials found for this store")

		return credentials
	}

	async findStoreCredentials(storeId: number) {
		return this.storeAddiCredentialsRepository.findOne({ where: { storeId }, withDeleted: true })
	}

	async getApiConnection(storeId: number) {
		return await this.apisConexionesRepository.findOne({ where: { tiendaId: storeId } })
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
