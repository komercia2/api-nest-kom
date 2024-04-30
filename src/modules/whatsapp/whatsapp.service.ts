import { BadRequestException, Injectable } from "@nestjs/common"
import { Logger } from "nestjs-pino"
import { Client, LocalAuth } from "whatsapp-web.js"

import { NotifyStoreCreationDto } from "./dto/notify-store-creation.dto"
import { handleCountryID } from "./utils/handle-country-id"

@Injectable()
export class WhatsappService {
	instance: Client = new Client({
		puppeteer: { headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] },
		authStrategy: new LocalAuth({
			dataPath: "./session.json"
		}),
		webVersionCache: {
			type: "remote",
			remotePath:
				"https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html"
		}
	})

	constructor(private readonly logger: Logger) {}

	sendWhatsappMessage = (number: string, message: string) => {
		const sanitized_number = number.toString().replace(/[- )(]/g, "")
		const final_number = sanitized_number.replace("+", "")

		this.instance.getNumberId(final_number).then((number_details) => {
			if (number_details) {
				this.instance.sendMessage(number_details._serialized, message)
				this.logger.log(`Message sent to ${final_number}`)
			} else {
				this.logger.error(`The number ${final_number} is not registered in WhatsApp`)
			}
		})
	}

	notifyStoreCreation = (notifyStoreCreation: NotifyStoreCreationDto) => {
		const { storeName, storeEmail, storeId, clientFullName, targetGroup, countryId } =
			notifyStoreCreation

		const fullCountry = handleCountryID(countryId)
		const message = `¡Felicidades! 🎉✨ Se ha creado una nueva tienda en Komercia. 🚀✨\n\n🆔 ID de la tienda: ${storeId}\n🏬 Nombre de la tienda: ${storeName}\n📧 Correo electrónico de la tienda: ${storeEmail}\n🙋 Nombre del cliente: ${clientFullName} \n🌎 País: ${fullCountry}`

		this.sendMessageToGroup(message, targetGroup)

		return { message: "Message sent" }
	}

	sendMessageToGroup = (message: string, targetGroup: string) => {
		this.instance.getChats().then((chats) => {
			const group = chats.find((chat) => chat.isGroup && chat.name === targetGroup)

			if (group) {
				group.sendMessage(message)
				this.logger.log(`Message sent to ${targetGroup}`)
			} else {
				this.logger.error(`Group ${targetGroup} not found`)
				throw new BadRequestException(`Group ${targetGroup} not found`)
			}
		})
	}
}
