import { Inject, Injectable } from "@nestjs/common"

import { IStoreBlogRepository } from "../../domain/repositories"
import { GetPagedStoreBlogsDto, StoreBlogsFilterDTO } from "./dtos"

@Injectable()
export class GetPagedStoreBlogsQuery {
	constructor(
		@Inject("IStoreBlogRepository")
		private readonly storeBlogRepository: IStoreBlogRepository
	) {}

	async execute(storeId: number, options: GetPagedStoreBlogsDto, filter: StoreBlogsFilterDTO) {
		const blogs = await this.storeBlogRepository.getPagedStoreBlogs(storeId, options, filter)
		const { data, count, limit } = blogs
		const blogsWihooutContent = data.map((blog) => ({ ...blog, content: undefined }))
		return {
			data: blogsWihooutContent,
			count,
			limit
		}
	}
}
