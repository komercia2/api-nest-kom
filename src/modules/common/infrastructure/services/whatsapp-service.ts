import { Logger } from "@nestjs/common"
import qrcode from "qrcode-terminal"
import { Client, LocalAuth } from "whatsapp-web.js"

const logger = new Logger("WhatsappService")

const client = new Client({
	puppeteer: { headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] },
	authStrategy: new LocalAuth({
		dataPath: "./session.json"
	})
})

client.on("qr", (qr) => {
	qrcode.generate(qr, { small: true })
})

console.log("Initializing client...")

client.on("ready", async () => {
	logger.log("Client is ready!")
})

client.initialize()

function sendWhatsappMessage(number: string, message: string) {
	const sanitized_number = number.toString().replace(/[- )(]/g, "")
	const final_number = `57${sanitized_number.substring(sanitized_number.length - 10)}`

	client.getNumberId(final_number).then((number_details) => {
		if (number_details) {
			client.sendMessage(number_details._serialized, message)
		} else {
			console.log(final_number, "Mobile number is not registered")
		}
	})
}

export { sendWhatsappMessage }
