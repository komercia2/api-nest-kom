import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import axios from "axios"
import { Logger } from "nestjs-pino"

interface ISendOrderCreatedWhatsappMessage {
	name: string
	cartId: string
	total: number
	to: string
	message: string
}

@Injectable()
export class WhatsappService {
	constructor(private readonly logger: Logger, private readonly configService: ConfigService) {}

	sendOrderCreatedWhatsappMessage = (data: ISendOrderCreatedWhatsappMessage) => {
		const { name, cartId, total, to, message } = data

		const sanitized_number = to.toString().replace(/[- )(]/g, "")
		const final_number = sanitized_number.replace("+", "")

		this.logger.log(`Sending message to ${final_number}`)

		const API_URL = this.configService.get<string>("API_WHATSAPP_URL")
		const USERNAME = this.configService.get<string>("API_WHATSAPP_USERNAME")
		const PASSWORD = this.configService.get<string>("API_WHATSAPP_PASSWORD")

		return axios.post(
			`${API_URL}/notify-order-created`,
			{
				name,
				cartId,
				total,
				to: final_number,
				message
			},
			{
				headers: {
					Authorization: `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString("base64")}`
				}
			}
		)
	}
}
