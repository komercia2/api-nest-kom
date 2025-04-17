import { Injectable } from "@nestjs/common"
import OpenAI from "openai"

@Injectable()
export class OpenAIProducSuggetionsServices {
	private readonly MODEL = "gpt-4o-mini"
	private readonly ROLE = "assistant"

	async getProductDescriptionSuggetion(apiKey: string, prompt: string) {
		try {
			const openAI = new OpenAI({
				apiKey: apiKey
			})

			const chatCompletion = await openAI.chat.completions.create({
				model: this.MODEL,
				messages: [{ role: this.ROLE, content: prompt }]
			})

			return chatCompletion.choices[0].message
		} catch (error) {
			console.log(error)
		}
	}
}
