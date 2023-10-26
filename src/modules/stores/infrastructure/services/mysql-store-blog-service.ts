import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { TiendaBlogs } from "src/entities"
import { Repository } from "typeorm"

import { GetPagedStoreBlogsDto } from "../../application/query/dtos"

@Injectable()
export class MySQLStoreBlogService {
	constructor(
		@InjectRepository(TiendaBlogs)
		private readonly storeBlogsRepository: Repository<TiendaBlogs>
	) {}

	async getPagedStoreBlogs(storeId: number, options: GetPagedStoreBlogsDto) {
		const { page, limit } = options
		const skip = (page - 1) * limit
		const take = limit

		const results = await this.storeBlogsRepository.find({
			where: { tiendasId: storeId },
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
