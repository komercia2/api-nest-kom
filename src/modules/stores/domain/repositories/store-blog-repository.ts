import { StoreBlogEntity } from "../entities"

interface IPagination {
	page: number
	limit: number
}

interface IStoreBlogFilter {
	title?: string
	content?: string
	author?: string
}

export interface IStoreBlogRepository {
	getPagedStoreBlogs: (
		storeId: number,
		options: IPagination
	) => Promise<{
		data: StoreBlogEntity[]
		count: number
		limit: number
	}>
}
