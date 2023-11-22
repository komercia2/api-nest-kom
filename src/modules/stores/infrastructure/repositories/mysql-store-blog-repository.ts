import { Inject } from "@nestjs/common"
import { TiendaBlogs } from "src/entities"

import { GetPagedStoreBlogsDto, StoreBlogsFilterDTO } from "../../application/query/dtos"
import { StoreBlogEntity } from "../../domain/entities"
import { IStoreBlogRepository } from "../../domain/repositories"
import { MySQLStoreBlogService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreBlogRepository implements IStoreBlogRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStoreBlogService)
		private readonly storeBlogService: MySQLStoreBlogService
	) {}

	async getStoreBlogById(storeId: number, storeBlogId: number): Promise<StoreBlogEntity | null> {
		const result = await this.storeBlogService.getStoreBlogById(storeId, storeBlogId)
		return result ? this.toEntity(result) : null
	}

	async getPagedStoreBlogs(
		storeId: number,
		options: GetPagedStoreBlogsDto,
		filter?: StoreBlogsFilterDTO
	): Promise<{ count: number; limit: number; data: StoreBlogEntity[] }> {
		const pagedBlogs = await this.storeBlogService.getPagedStoreBlogs(storeId, options, filter)
		return {
			count: pagedBlogs.count,
			limit: pagedBlogs.limit,
			data: pagedBlogs.data.map(this.toEntity)
		}
	}

	private toEntity = (entity: TiendaBlogs): StoreBlogEntity => ({
		id: entity.id,
		autor: entity.autor,
		contenido: entity.contenido,
		titulo: entity.titulo,
		imagen_principal_url: entity.imagenPrincipalUrl,
		estado: entity.estado,
		updated_at: entity.updatedAt,
		imagen_principal_id: entity.imagenPrincipalId,
		slug: entity.slug,
		resumen: entity.resumen,
		created_at: entity.createdAt
	})
}
