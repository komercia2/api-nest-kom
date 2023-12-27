export interface IUserAdress {
	id?: number
	direccion: string
	tag: string
	nombre: string
	apellido: string
	celular: string
	barrio: string
	ciudadId: number
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date | null
}

export class UserAdressEntity implements IUserAdress {
	id?: number
	direccion: string
	tag: string
	nombre: string
	apellido: string
	celular: string
	barrio: string
	ciudadId: number
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date | null

	constructor(data: IUserAdress) {
		this.id = data.id
		this.direccion = data.direccion
		this.tag = data.tag
		this.nombre = data.nombre
		this.apellido = data.apellido
		this.celular = data.celular
		this.barrio = data.barrio
		this.ciudadId = data.ciudadId
		this.createdAt = data.createdAt || new Date()
		this.updatedAt = data.updatedAt
		this.deletedAt = data.deletedAt || null
	}

	static create(data: IUserAdress): UserAdressEntity {
		return new UserAdressEntity(data)
	}
}
