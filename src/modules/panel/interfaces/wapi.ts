export interface IWapiTemplate {
	id: string
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
