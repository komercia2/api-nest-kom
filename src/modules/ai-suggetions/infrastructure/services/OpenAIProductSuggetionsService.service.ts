import { Injectable } from "@nestjs/common"
import { Configuration, OpenAIApi } from "openai"

@Injectable()
export class OpenAIProducSuggetionsServices {
	private configuration: Configuration

	private readonly MODEL = "gpt-3.5-turbo"
	private readonly ROLE = "assistant"

	async getProductDescriptionSuggetion(apiKey: string, prompt: string) {
		try {
			this.initializeOpenAI(apiKey)
			const openAI = new OpenAIApi(this.configuration)

			const chatCompletion = await openAI.createChatCompletion({
				model: this.MODEL,
				messages: [{ role: this.ROLE, content: prompt }]
			})

			return chatCompletion.data.choices[0].message
		} catch (error) {
			console.log(error)
		}
	}

	private initializeOpenAI(apiKey: string) {
		this.configuration = new Configuration({ apiKey })
		return this
	}
}
