export interface IUserAdress {
	id: number
	direccion: string
	tag: string
	userId: number
	nombre: string
	apellido: string
	celular: string
	barrio: string
	ciudadId: number
	createdAt: Date | null
	updatedAt: Date | null
	deletedAt: Date | null
}

export class UserAdressEntity implements IUserAdress {
	id: number
	direccion: string
	tag: string
	userId: number
	nombre: string
	apellido: string
	celular: string
	barrio: string
	ciudadId: number
	createdAt: Date | null
	updatedAt: Date | null
	deletedAt: Date | null

	constructor(data: IUserAdress) {
		this.id = data.id
		this.direccion = data.direccion
		this.tag = data.tag
		this.userId = data.userId
		this.nombre = data.nombre
		this.apellido = data.apellido
		this.celular = data.celular
		this.barrio = data.barrio
		this.ciudadId = data.ciudadId
		this.createdAt = data.createdAt
		this.updatedAt = data.updatedAt
		this.deletedAt = data.deletedAt
	}

	static create(data: IUserAdress): UserAdressEntity {
		return new UserAdressEntity(data)
	}
}
