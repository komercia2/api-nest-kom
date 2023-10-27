import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { TiendaBlogs } from "src/entities"
import { Like, Repository } from "typeorm"

import { GetPagedStoreBlogsDto, StoreBlogsFilterDTO } from "../../application/query/dtos"

@Injectable()
export class MySQLStoreBlogService {
	constructor(
		@InjectRepository(TiendaBlogs)
		private readonly storeBlogsRepository: Repository<TiendaBlogs>
	) {}

	async getPagedStoreBlogs(
		storeId: number,
		options: GetPagedStoreBlogsDto,
		filter?: StoreBlogsFilterDTO
	) {
		const { page, limit } = options
		const skip = (page - 1) * limit
		const take = limit
		const title = filter?.title
		const titleQuery = title ? Like(`%${title}%`) : Like("%%")

		const results = await this.storeBlogsRepository.find({
			where: { tiendasId: storeId, estado: true, titulo: titleQuery },
			select: {
				id: true,
				autor: true,
				createdAt: true,
				estado: true,
				imagenPrincipalId: true,
				imagenPrincipalUrl: true,
				slug: true,
				resumen: true,
				updatedAt: true,
				titulo: true,
				tiendasId: true
			},
			skip,
			take
		})

		return {
			count: results.length,
			limit,
			data: results
		}
	}
}
