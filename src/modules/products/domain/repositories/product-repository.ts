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
	topSales: boolean
	favorite: number
	alphabetic: "ASC" | "DESC"
	price: "ASC" | "DESC"
}

export interface IProductRepository {
	getPagedProducts(input: IProductFilterDTO): Promise<{
		publicProductList: Productos[]
		count: number
		priceMinimum: number
		priceLimit: number
	}>

	getProductBySlug(slug: string): Promise<Productos | null>

	createFromFile(storeId: number, file: Express.Multer.File): Promise<void>
}
