interface IStoreDiscount {
	id: string
	nombre: string | null
	porcentaje_descuento: number | null
	valor_descuento: number | null
	cantidad_productos: number | null
	tiendas_id: number
	created_at: Date | null
	updated_at: Date | null
	tipo: number
	rangos_precios: string | null
	opcion: number
	estado: boolean
}

export class StoreDiscountEntity implements IStoreDiscount {
	id: string
	nombre: string | null
	porcentaje_descuento: number | null
	valor_descuento: number | null
	cantidad_productos: number | null
	tiendas_id: number
	created_at: Date | null
	updated_at: Date | null
	tipo: number
	rangos_precios: string | null
	opcion: number
	estado: boolean

	constructor(storeDiscount: IStoreDiscount) {
		this.id = storeDiscount.id
		this.nombre = storeDiscount.nombre
		this.porcentaje_descuento = storeDiscount.porcentaje_descuento
		this.valor_descuento = storeDiscount.valor_descuento
		this.cantidad_productos = storeDiscount.cantidad_productos
		this.tiendas_id = storeDiscount.tiendas_id
		this.created_at = storeDiscount.created_at
		this.updated_at = storeDiscount.updated_at
		this.tipo = storeDiscount.tipo
		this.rangos_precios = storeDiscount.rangos_precios
		this.opcion = storeDiscount.opcion
		this.estado = storeDiscount.estado
	}
}
