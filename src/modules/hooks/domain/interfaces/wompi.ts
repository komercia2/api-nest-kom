export interface IWompiEntity {
	event: string
	data: Data
	environment: string
	signature: Signature
	timestamp: number
	sent_at: string
}

export type EventStatus = "APPROVED" | "VOIDED" | "DECLINED" | "ERROR"

export interface Data {
	transaction: Transaction
}

export interface Transaction {
	id: string
	amount_in_cents: number
	reference: string
	customer_email: string
	currency: string
	payment_method_type: string
	redirect_url: string
	status: EventStatus
	shipping_address: string | null
	payment_link_id: string | null
	payment_source_id: string | null
}

export interface Signature {
	properties: string[]
	checksum: string
}
