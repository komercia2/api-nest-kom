export interface OrderEmailDto {
	total: string
	logo: string
	logoKomercia: string
	logoKomerciaWhite: string
	isClient: boolean
	IdOrden: number
	data: Data
}

export interface Data {
	venta: Venta
	productos: Producto[]
}

export interface Venta {
	id: number
	URL_order: string
	usuario: Usuario
	fecha: string
	total: number
	direccion_entrega: DireccionEntrega | null
	isDataShipping: boolean
	URL_store: string
	canal: string
	costo_envio: string
	descuento: number
	method_shipping: string
	tienda_venta: TiendaVenta
}

export interface Usuario {
	nombre: string
	tipo_identificacion: string
	identificacion: string
}

export interface DireccionEntrega {
	direccion: string
	tag: string
	nombre: string
	celular: string
	barrio: string
}

export interface TiendaVenta {
	nombre: string
	subdominio: string
	dominio: string
	email_tienda: string
	telefono: string
}

export interface Producto {
	cantidad: number
	id: number
	nombre: string
	precio: number
	foto_cloudinary: string
	combinacion: string
}
