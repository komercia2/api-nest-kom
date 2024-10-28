import { Data, IWompiEntity, Signature } from "../interfaces"

export class WompiEntity implements IWompiEntity {
	event: string
	data: Data
	environment: string
	signature: Signature
	timestamp: number
	sent_at: string

	constructor(
		event: string,
		data: Data,
		environment: string,
		signature: Signature,
		timestamp: number,
		sent_at: string
	) {
		this.event = event
		this.data = data
		this.environment = environment
		this.signature = signature
		this.timestamp = timestamp
		this.sent_at = sent_at
	}
}
