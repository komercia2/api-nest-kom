interface IProductSubcategoryEntity {
	id: number
	nombreSubcategoria: string
	categoria: number
	tienda: number
	idCloudinary: string | null
	imagenCloudinary: string | null
}

export class ProductSubcategoryEntity implements IProductSubcategoryEntity {
	public id: number
	public nombreSubcategoria: string
	public categoria: number
	public tienda: number
	public idCloudinary: string | null
	public imagenCloudinary: string | null

	constructor(data: IProductSubcategoryEntity) {
		this.id = data.id
		this.nombreSubcategoria = data.nombreSubcategoria
		this.categoria = data.categoria
		this.tienda = data.tienda
		this.idCloudinary = data.idCloudinary
		this.imagenCloudinary = data.imagenCloudinary
	}
}
