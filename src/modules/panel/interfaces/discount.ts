export interface IDiscount {
	id: number
	nombre: string
	porcentaje_descuento: number | null
	valor_descuento: number | null
	cantidad_productos: number
	tiendas_id: number
	created_at: string
	updated_at: string
	tipo: number
	rangos_precios: string | null
	opcion: number
	estado: boolean
}
