import { AddiApplicationStatus } from "../enums/addi-application-status"

export class AddiHookEntity {
	constructor(
		readonly orderId: number,
		readonly applicationId: string,
		readonly approvedAmount: number,
		readonly currency: string,
		readonly status: AddiApplicationStatus,
		readonly statusTimestamp: number
	) {
		this.orderId = orderId
		this.applicationId = applicationId
		this.approvedAmount = approvedAmount
		this.currency = currency
		this.status = status
		this.statusTimestamp = statusTimestamp
	}
}
