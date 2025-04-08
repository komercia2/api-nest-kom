export interface IProductCategorie {
	id: number
	nombre_categoria_producto: string
	tienda: number
	descripcion: string | null
	foto_banner: string | null
	orden: number
	foto_icono: string | null
	id_cloudinary: string | null
	imagen_cloudinary: string | null
}

export type ICreateProductCategorie = Omit<IProductCategorie, "id" | "tienda">
