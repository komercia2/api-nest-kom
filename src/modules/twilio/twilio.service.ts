import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { Logger } from "nestjs-pino"
import { UsersInfo } from "src/entities"
import { Twilio } from "twilio"
import { Repository } from "typeorm"

import { SendVerifyCodeDto } from "./dtos/send-verify-code.dto"
import { VerifyCodeDto } from "./dtos/verify-code.dto"

@Injectable()
export class TwilioService {
	private readonly twilioInstance: Twilio

	constructor(
		@InjectRepository(UsersInfo) private readonly usersInfoRepository: Repository<UsersInfo>,
		private readonly configService: ConfigService,
		private readonly logger: Logger
	) {
		const accountSid = this.configService.get<string>("TWILIO_ACCOUNT_SID")
		const authToken = this.configService.get<string>("TWILIO_AUTH_TOKEN")

		this.twilioInstance = new Twilio(accountSid, authToken)
	}

	async sendVerifyCode(dto: SendVerifyCodeDto): Promise<void> {
		const { phoneNumber, channel } = dto

		const userInfo = await this.usersInfoRepository.findOne({
			where: { telefono: phoneNumber },
			relations: { idUser2: true }
		})

		if (userInfo && userInfo?.idUser2) {
			if (userInfo?.idUser2.tienda !== 0) throw new ConflictException("User already exists")
		}

		try {
			await this.twilioInstance.verify.v2
				.services(this.configService.get<string>("TWILIO_VERIFY_SERVICE_SID") ?? "")
				.verifications.create({ to: phoneNumber, channel })
		} catch (error) {
			this.logger.error(`Error sending verification code: ${error}`)
			throw new InternalServerErrorException("Error sending verification code")
		}
	}

	async verifyCode(dto: VerifyCodeDto): Promise<void> {
		const { phoneNumber, code } = dto

		try {
			await this.twilioInstance.verify.v2
				.services(this.configService.get<string>("TWILIO_VERIFY_SERVICE_SID") ?? "")
				.verificationChecks.create({ to: phoneNumber, code })
		} catch (error) {
			this.logger.error(`Error verifying code: ${error}`)
			throw new InternalServerErrorException("Error verifying code")
		}
	}
}
