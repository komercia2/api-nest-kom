import { Data, IWompiEntity, Signature } from "../interfaces"

export class WompiEntity implements IWompiEntity {
	event: string
	data: Data
	environment: string
	signature: Signature
	timestamp: number
	sent_at: string

	private constructor(props: IWompiEntity) {
		this.event = props.event
		this.data = props.data
		this.environment = props.environment
		this.signature = props.signature
		this.timestamp = props.timestamp
		this.sent_at = props.sent_at
	}

	static create(props: IWompiEntity): WompiEntity {
		return new WompiEntity(props)
	}
}
