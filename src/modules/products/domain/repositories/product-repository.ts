import { Productos } from "../../../../entities"

export interface IProductFilterDTO {
	name: string
	storeId: number
	page: number
	limit: number
	active: boolean
	category: string
	subcategory: string
	freeShipping: boolean
	promotion: boolean
	minPrice: number
	maxPrice: number
	tagPropertyId: number
	withVariants: boolean
}

export interface IProductRepository {
	getPagedProducts(
		input: IProductFilterDTO
	): Promise<{ publicProductList: Productos[]; count: number; priceLimit: number }>

	getProductBySlug(slug: string): Promise<Productos | null>
}
