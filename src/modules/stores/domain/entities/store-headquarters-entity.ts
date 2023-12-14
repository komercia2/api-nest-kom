export interface IStoreHeadquartersEntity {
	readonly id: number
	readonly nombre_sede: string | null
	readonly tienda: number
	readonly direccion: string
	readonly latitud: number
	readonly longitud: number
	readonly ciudad: number
	readonly horario: string | null
	readonly foto_tienda: string | null
	readonly telefono: string | null
}

export class StoreHeadquartersEntity implements IStoreHeadquartersEntity {
	readonly id: number
	readonly nombre_sede: string | null
	readonly tienda: number
	readonly direccion: string
	readonly latitud: number
	readonly longitud: number
	readonly ciudad: number
	readonly horario: string | null
	readonly foto_tienda: string | null
	readonly telefono: string | null

	constructor(data: IStoreHeadquartersEntity) {
		this.id = data.id
		this.nombre_sede = data.nombre_sede
		this.tienda = data.tienda
		this.direccion = data.direccion
		this.latitud = data.latitud
		this.longitud = data.longitud
		this.ciudad = data.ciudad
		this.horario = data.horario
		this.foto_tienda = data.foto_tienda
		this.telefono = data.telefono
	}
	static create(data: IStoreHeadquartersEntity) {
		return new StoreHeadquartersEntity(data)
	}
}
