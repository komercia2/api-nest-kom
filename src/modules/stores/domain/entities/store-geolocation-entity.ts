interface IStoreGeolocationEntity {
	id: number
	nombreSede: string | null
	tienda: number
	direccion: string
	latitud: number
	longitud: number
	ciudad: number
	horario: string | null
	fotoTienda: string | null
	createdAt: Date
	updatedAt: Date
	telefono: string | null
}

export class StoreGeolocationEntity implements IStoreGeolocationEntity {
	id: number
	nombreSede: string | null
	tienda: number
	direccion: string
	latitud: number
	longitud: number
	ciudad: number
	horario: string | null
	fotoTienda: string | null
	createdAt: Date
	updatedAt: Date
	telefono: string | null

	constructor(data: IStoreGeolocationEntity) {
		this.id = data.id
		this.nombreSede = data.nombreSede
		this.tienda = data.tienda
		this.direccion = data.direccion
		this.latitud = data.latitud
		this.longitud = data.longitud
		this.ciudad = data.ciudad
		this.horario = data.horario
		this.fotoTienda = data.fotoTienda
		this.createdAt = data.createdAt
		this.updatedAt = data.updatedAt
		this.telefono = data.telefono
	}
}
