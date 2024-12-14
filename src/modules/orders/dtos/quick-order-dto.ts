export interface CreateQuickOrderDto {
	productos: Product[]
	tienda: number
	tipo: boolean
	total: number
	estado: number
	direccion_entrega: number
	descuento: number
	cupon: string
	metodo_pago: string
	costo_envio: string
	canal: number
	ip: string
	takeout: boolean
	usuario: number
	estado_entrega: number
	comentario: string
}

export interface Product {
	id: number
	nombre: string
	foto_cloudinary: string
	precio: number
	con_variante: number
	cantidad: number
	inventario: number
	combinacion?: string
}
