export interface CreateOrderDto {
	canal: string
	usuario: number
	tipo: boolean
	tienda: number
	total: number
	costo_envio: string
	reseller: number
	direccion_entrega: DireccionEntrega
	productos: Producto[]
	ip: string
	takeout: boolean
	estado_entrega: number
	comentario: string | null
	descuento: number
	cupon: string
	metodo_pago: string
	emailCliente?: string
	datosTienda: {
		logo: string
		nombre: string
		subdominio: string
		dominio: string
		email_tienda?: string
		telefono: string
	}
}

export interface DireccionEntrega {
	type: number
	value: DireccionEntregaInfo | null
}

export interface DireccionEntregaInfo {
	id: number
	direccion: string
	tag: string
	user_id: number
	created_at: Date
	updated_at: Date
	deleted_at: string | null
	nombre: string
	apellido: string
	celular: string
	barrio: string
	ciudad_id: number
}

export interface Producto {
	id: number
	cantidad: number
	nombre: string
	precio: number
	foto_cloudinary: string
	activo: number
	foto: string
	con_variante: number
	envio_gratis: number
	orden: number
	tag: string | null
	informacion_producto: InformacionProducto[]
	variantes: Variante[]
	combinacion: string
	stock_disponible: number
	unidades_disponibles: number
}

export interface InformacionProducto {
	id: number
	marca: string | null
	sku: string | null
	peso: string | null
	descripcion: string
	inventario: number
	video: string | null
	visitas: number
	positiva: number
	negativa: number
	garantia: string | null
	codigo_barras: string | null
	codigo_qr: string | null
	proveedores_id: string | null
	tipo_servicio: string
	boton_compra: string | null
	boton_whatsapp: string | null
	boton_personalizado: string | null
	texto_boton_personalizado: string | null
	url_boton_personalizado: string | null
	activar_mensajes: string | null
	label_mensaje: string | null
	mensaje_obligatorio: string | null
	mensaje: string | null
	iframe: string | null
	descripcion_corta: string
	promocion_valor: number
	tag_promocion: string
	etiquetas: string | null
	bodega: string | null
	alto: string | null
	ancho: string | null
	largo: string | null
	proveedor: string | null
}

export interface Variante {
	id: number
	variantes: string
	id_producto: number
	combinaciones: Combinacion[]
}

export interface Combinacion {
	id: number
	combinaciones: string
	id_productos_variantes: number
}
