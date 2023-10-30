interface ITemplate99Entity {
	id: number
	banner: string | null
	tiendas_id: number
	created_at: Date | null
	updated_at: Date | null
	descripcion: string | null
	logo_cuadrado: number
	color_primario: string | null
	color_secundario: string | null
	color_icon: string | null
	tema: number
	pago_online: number
	mensaje_principal: string | null
	estilo_productos: number
	estilo_categorias: number
	watermark: number
	state_subcategorias: number
}

export class Template99Entity implements ITemplate99Entity {
	id: number
	banner: string | null
	tiendas_id: number
	created_at: Date | null
	updated_at: Date | null
	descripcion: string | null
	logo_cuadrado: number
	color_primario: string | null
	color_secundario: string | null
	color_icon: string | null
	tema: number
	pago_online: number
	mensaje_principal: string | null
	estilo_productos: number
	estilo_categorias: number
	watermark: number
	state_subcategorias: number

	constructor(data: ITemplate99Entity) {
		this.id = data.id
		this.banner = data.banner
		this.tiendas_id = data.tiendas_id
		this.created_at = data.created_at
		this.updated_at = data.updated_at
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
