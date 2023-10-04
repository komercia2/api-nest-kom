import { Productos } from "../../../../entities"

export interface IProductRepository {
	getPagedProducts(
		storeId: number,
		page: number,
		limit: number,
		active: boolean
	): Promise<Productos[]>
}
