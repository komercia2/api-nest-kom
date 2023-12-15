export interface IStoreShippingMeansEntity {
	medios: Medios
	informacion: Informacion[]
}

export interface Informacion {
	id: number
	valores: string
	estado: boolean
	id_pais: number
	id_tienda: number
}

export interface Medios {
	gratis: boolean
	tarifa_plana: boolean
	peso: boolean
	precio: boolean
	zonas: Zona[]
}

export interface Zona {
	id: string
	name: string
	delivery_time: string
	price: string
	ciudades_id: number | null
	tiendas_id: number | null
	ciudad: Ciudad
	paths: Path[]
}

export interface Ciudad {
	id: number
	nombre_ciu: string
	dep: number
	codigo_dane: string | null
	departamento: Departamento
}

export interface Departamento {
	id: number
	nombre_dep: string
	paises_id: number
}

export interface Path {
	lat: number
	lng: number
}

export class StoreShippingMeanEntity implements IStoreShippingMeansEntity {
	readonly medios: Medios
	readonly informacion: Informacion[]

	constructor(data: IStoreShippingMeansEntity) {
		this.medios = data.medios
		this.informacion = data.informacion
	}

	static create(data: IStoreShippingMeansEntity) {
		return new StoreShippingMeanEntity(data)
	}
}
