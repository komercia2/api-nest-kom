import { Injectable, OnModuleInit } from "@nestjs/common"
import { Logger } from "nestjs-pino"
import qrcode from "qrcode-terminal"
import { Client, LocalAuth } from "whatsapp-web.js"

@Injectable()
export class WhatsappService {
	instance: Client = new Client({
		puppeteer: { headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] },
		authStrategy: new LocalAuth({
			dataPath: "./session.json"
		})
	})

	constructor(private readonly logger: Logger) {}

	sendWhatsappMessage = (number: string, message: string) => {
		const sanitized_number = number.toString().replace(/[- )(]/g, "")
		const final_number = `57${sanitized_number.substring(sanitized_number.length - 10)}`

		this.instance.getNumberId(final_number).then((number_details) => {
			if (number_details) {
				this.instance.sendMessage(number_details._serialized, message)
				this.logger.log(`Message sent to ${final_number}`)
			} else {
				this.logger.error(`The number ${final_number} is not registered in WhatsApp`)
			}
		})
	}
}
