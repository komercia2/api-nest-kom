interface IMercadopagoStoreInfoEntity {
	readonly id?: number
	readonly publicKey: string
	readonly accessToken: string
	readonly refreshToken: string
	readonly collectorId: string | null
	readonly estado?: boolean
	readonly createdAt?: Date | null
	readonly updatedAt?: Date | null
	readonly idTienda: number
}

export class MercadopagoStoreInfoEntity implements IMercadopagoStoreInfoEntity {
	readonly id?: number
	readonly publicKey: string
	readonly accessToken: string
	readonly refreshToken: string
	readonly collectorId: string | null
	readonly estado?: boolean
	readonly createdAt?: Date | null
	readonly updatedAt?: Date | null
	readonly idTienda: number

	constructor(props: IMercadopagoStoreInfoEntity) {
		this.id = props.id
		this.publicKey = props.publicKey
		this.accessToken = props.accessToken
		this.refreshToken = props.refreshToken
		this.collectorId = props.collectorId
		this.estado = props.estado ?? true
		this.createdAt = props.createdAt
		this.updatedAt = props.updatedAt ?? new Date()
		this.idTienda = props.idTienda
	}

	static create(props: IMercadopagoStoreInfoEntity) {
		return new MercadopagoStoreInfoEntity(props)
	}
}
