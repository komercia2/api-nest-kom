export interface ICustomerAccessCode {
	id: string
	user_code: string
	user_name: string
	user_email: string | null
	access_code: string
	status: boolean
	tiendas_id: number
	created_at: Date | null
	updated_at: Date | null
}
