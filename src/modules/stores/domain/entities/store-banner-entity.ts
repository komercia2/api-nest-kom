interface IStoreBannerEntity {
	id: number
	tienda: number
	rutaBanner: string
	order: number | null
	redireccion: string | null
	titulo: string | null
	descripcion: string | null
	fotoCloudinary: string | null
	posicion: string | null
	idCloudinary: string | null
}

export class StoreBannerEntity implements IStoreBannerEntity {
	id: number
	tienda: number
	rutaBanner: string
	order: number | null
	redireccion: string | null
	titulo: string | null
	descripcion: string | null
	fotoCloudinary: string | null
	posicion: string | null
	idCloudinary: string | null

	constructor(data: IStoreBannerEntity) {
		this.id = data.id
		this.tienda = data.tienda
		this.rutaBanner = data.rutaBanner
		this.order = data.order
		this.redireccion = data.redireccion
		this.titulo = data.titulo
		this.descripcion = data.descripcion
		this.fotoCloudinary = data.fotoCloudinary
		this.posicion = data.posicion
		this.idCloudinary = data.idCloudinary
	}
}
