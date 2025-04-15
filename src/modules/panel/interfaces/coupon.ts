export interface ICoupon {
	id: string
	nombre: string
	codigo: string
	estado: boolean
	tipo: boolean
	porcentaje_descuento: number | null
	valor_descuento: number | null
	tiendas_id: number
	deleted_at: Date | null
	created_at: Date | null
	updated_at: Date | null
	publico: boolean
}
