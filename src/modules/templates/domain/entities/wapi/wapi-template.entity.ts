interface IWapiTemplateEntity {
	_id: string
	banner: string | null
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

export class WapiTemplateEntity implements IWapiTemplateEntity {
	_id: string
	banner: string | null
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

	constructor(data: IWapiTemplateEntity) {
		this._id = data._id
		this.banner = data.banner
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
