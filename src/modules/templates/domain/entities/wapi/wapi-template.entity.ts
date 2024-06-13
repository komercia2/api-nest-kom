interface IWapiTemplateEntity {
	_id: string
	banner: string | null
	descripcion: string | null
	logo_cuadrado: boolean | null
	color_primario: string | null
	color_secundario: string | null
	color_icon: string | null
	tema: number | null
	pago_online: boolean | null
	mensaje_principal: string | null
	estilo_productos: number | null
	estilo_categorias: number | null
	watermark: boolean
	state_subcategorias: boolean
}

export class WapiTemplateEntity implements IWapiTemplateEntity {
	_id: string
	banner: string | null
	descripcion: string | null
	logo_cuadrado: boolean | null
	color_primario: string | null
	color_secundario: string | null
	color_icon: string | null
	tema: number | null
	pago_online: boolean | null
	mensaje_principal: string | null
	estilo_productos: number | null
	estilo_categorias: number | null
	watermark: boolean
	state_subcategorias: boolean

	constructor(data: IWapiTemplateEntity) {
		this._id = data._id
		this.banner = data.banner
		this.descripcion = data.descripcion
		this.logo_cuadrado = data.logo_cuadrado
		this.color_primario = data.color_primario
		this.color_secundario = data.color_secundario
		this.color_icon = data.color_icon
		this.tema = data.tema
		this.pago_online = data.pago_online
		this.mensaje_principal = data.mensaje_principal
		this.estilo_productos = data.estilo_productos
		this.estilo_categorias = data.estilo_categorias
		this.watermark = data.watermark
		this.state_subcategorias = data.state_subcategorias
	}
}
