export interface IMercadopagoIntegrationStatusEntity {
	readonly createdAt: Date | null
	readonly updatedAt: Date | null
	readonly storeId: number
	readonly status: boolean
	readonly daysRemaining?: number
}

export class MercadopagoIntegrationStatusEntity implements IMercadopagoIntegrationStatusEntity {
	readonly createdAt: Date | null
	readonly updatedAt: Date | null
	readonly storeId: number
	readonly status: boolean
	readonly daysRemaining?: number
	private readonly INTEGRATION_DURATION_DAYS = 180

	constructor(props: IMercadopagoIntegrationStatusEntity) {
		this.createdAt = props.createdAt
		this.updatedAt = props.updatedAt
		this.storeId = props.storeId
		this.status = props.status
		this.daysRemaining = this.getRemainingDays()
	}

	public static create(props: IMercadopagoIntegrationStatusEntity) {
		return new MercadopagoIntegrationStatusEntity(props)
	}

	/**
	 * @description Calculate days remaining to disable mercadopago integration
	 * @returns Days remaining
	 */
	private getRemainingDays(): number | undefined {
		if (!this.updatedAt) return

		const currentDate = new Date()
		const creationDate = new Date(this.updatedAt)

		const timeDifference = currentDate.getTime() - creationDate.getTime()

		const daysElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

		const daysRemaining = Math.abs(this.INTEGRATION_DURATION_DAYS - daysElapsed)

		return daysRemaining > 0 ? daysRemaining : 0
	}
}
