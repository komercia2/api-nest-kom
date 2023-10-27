import { StoreBlogEntity } from "../entities"

interface IPagination {
	page: number
	limit: number
}

interface IStoreBlogFilter {
	title?: string
}

export interface IStoreBlogRepository {
	getPagedStoreBlogs: (
		storeId: number,
		options: IPagination,
		filters?: IStoreBlogFilter
	) => Promise<{
		data: StoreBlogEntity[]
		count: number
		limit: number
	}>
}
