export interface IBankEntity {
	readonly id: number
	readonly nombre: string
	readonly imagen: string
	readonly created_at: Date | null
	readonly updated_at: Date | null
	readonly paises_id: number | null
}

export class BankEntity implements IBankEntity {
	readonly id: number
	readonly nombre: string
	readonly imagen: string
	readonly created_at: Date | null
	readonly updated_at: Date | null
	readonly paises_id: number | null

	constructor(data: IBankEntity) {
		this.id = data.id
		this.nombre = data.nombre
		this.imagen = data.imagen
		this.created_at = data.created_at
		this.updated_at = data.updated_at
		this.paises_id = data.paises_id
	}

	static create(data: IBankEntity) {
		return new BankEntity(data)
	}
}
