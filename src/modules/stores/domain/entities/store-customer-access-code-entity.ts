interface IStoreCustomerAccessCodeEntity {
	id: string
	user_code: string | null
	user_name: string
	user_email: string | null
	access_code: string
	status: boolean
	tiendas_id: number
	created_at: Date | null
	updated_at: Date | null
}

export class StoreCustomerAccessCodeEntity implements IStoreCustomerAccessCodeEntity {
	id: string
	user_code: string | null
	user_name: string
	user_email: string | null
	access_code: string
	status: boolean
	tiendas_id: number
	created_at: Date | null
	updated_at: Date | null

	constructor(props: IStoreCustomerAccessCodeEntity) {
		this.id = props.id
		this.user_code = props.user_code
		this.user_name = props.user_name
		this.user_email = props.user_email
		this.access_code = props.access_code
		this.status = props.status
		this.tiendas_id = props.tiendas_id
		this.created_at = props.created_at
		this.updated_at = props.updated_at
	}
}
