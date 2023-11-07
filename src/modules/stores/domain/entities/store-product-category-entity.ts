interface IStoreProductCategoryEntity {
	id: number
	nombreCategoriaProducto: string
	tienda: number
	descripcion: string | null
	fotoBanner: string | null
	orden: number | null
	fotoIcono: string | null
	idCloudinary: string | null
	imagenCloudinary: string | null
}

export class StoreProductCategoryEntity implements IStoreProductCategoryEntity {
	id: number
	nombreCategoriaProducto: string
	tienda: number
	descripcion: string | null
	fotoBanner: string | null
	orden: number | null
	fotoIcono: string | null
	idCloudinary: string | null
	imagenCloudinary: string | null

	constructor(storeProductCategoryEntity: IStoreProductCategoryEntity) {
		this.id = storeProductCategoryEntity.id
		this.nombreCategoriaProducto = storeProductCategoryEntity.nombreCategoriaProducto
		this.tienda = storeProductCategoryEntity.tienda
		this.descripcion = storeProductCategoryEntity.descripcion
		this.fotoBanner = storeProductCategoryEntity.fotoBanner
		this.orden = storeProductCategoryEntity.orden
		this.fotoIcono = storeProductCategoryEntity.fotoIcono
		this.idCloudinary = storeProductCategoryEntity.idCloudinary
		this.imagenCloudinary = storeProductCategoryEntity.imagenCloudinary
	}
}
