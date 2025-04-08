export interface IProductSubcategorie {
	id: number
	nombre_subcategoria: string
	tienda: number
	categoria_producto: number
	descripcion: string | null
	foto_banner: string | null
	orden: number
	foto_icono: string | null
	id_cloudinary: string | null
	imagen_cloudinary: string | null
}

export type ICreateProductSubcategorie = Omit<IProductSubcategorie, "id" | "tienda">
