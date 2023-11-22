interface ITemplate99Entity {
	id: string
	banner: string | null
	tiendasId: number
	createdAt: Date | null
	updatedAt: Date | null
	descripcion: string | null
	logoCuadrado: boolean | null
	colorPrimario: string | null
	colorSecundario: string | null
	colorIcon: string | null
	tema: number | null
	pagoOnline: boolean | null
	mensajePrincipal: string | null
	estiloProductos: number | null
	estiloCategorias: number | null
	watermark: boolean
	stateSubcategorias: boolean
}

export class Template99Entity implements ITemplate99Entity {
	id: string
	banner: string | null
	tiendasId: number
	createdAt: Date | null
	updatedAt: Date | null
	descripcion: string | null
	logoCuadrado: boolean | null
	colorPrimario: string | null
	colorSecundario: string | null
	colorIcon: string | null
	tema: number | null
	pagoOnline: boolean | null
	mensajePrincipal: string | null
	estiloProductos: number | null
	estiloCategorias: number | null
	watermark: boolean
	stateSubcategorias: boolean

	constructor(data: ITemplate99Entity) {
		this.id = data.id
		this.banner = data.banner
		this.tiendasId = data.tiendasId
		this.createdAt = data.createdAt
		this.updatedAt = data.updatedAt
		this.descripcion = data.descripcion
		this.logoCuadrado = data.logoCuadrado
		this.colorPrimario = data.colorPrimario
		this.colorSecundario = data.colorSecundario
		this.colorIcon = data.colorIcon
		this.tema = data.tema
		this.pagoOnline = data.pagoOnline
		this.mensajePrincipal = data.mensajePrincipal
		this.estiloProductos = data.estiloProductos
		this.estiloCategorias = data.estiloCategorias
		this.watermark = data.watermark
		this.stateSubcategorias = data.stateSubcategorias
	}
}
