import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Carritos as CartEntity } from "src/entities"
import { Repository } from "typeorm"

import { FilterSalesDto } from "./dtos/filter-sales.dto"

@Injectable()
export class SalesService {
	constructor(
		@InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>
	) {}

	async getFilteredSales(filter: FilterSalesDto) {
		const {
			page,
			limit,
			id,
			state,
			startDate,
			paymentMethod,
			endDate,
			clientName,
			clientIdentification,
			order,
			storeId
		} = filter

		const skip = (page - 1) * limit

		const query = this.cartRepository
			.createQueryBuilder("carritos")
			.addSelect(["user.id", "user.nombre", "user.identificacion"])
			.where("carritos.tienda = :storeId", { storeId })
			.andWhere("carritos.deletedAt IS NULL")
			.andWhere("carritos.canal != '0'")
			.leftJoin("carritos.usuario2", "user")
			.skip(skip)
			.take(limit)
			.orderBy("carritos.createdAt", order)

		if (id) query.andWhere("carritos.id = :id", { id })

		if (state) query.andWhere("carritos.estado = :state", { state })

		if (startDate && endDate) {
			query.andWhere("carritos.createdAt BETWEEN :startDate AND :endDate", {
				startDate,
				endDate
			})
		}

		if (clientName) {
			query.andWhere("user.nombre LIKE :clientName", {
				clientName: `%${clientName}%`
			})
		}

		if (clientIdentification) {
			query.andWhere("user.identificacion LIKE :clientIdentification", {
				clientIdentification: `%${clientIdentification}%`
			})
		}

		if (paymentMethod) {
			query.andWhere("carritos.metodoPago = :paymentMethod", { paymentMethod })
		}

		const [sales, total] = await query.getManyAndCount()

		return {
			sales,
			currentPage: page,
			lastPage: Math.ceil(total / limit),
			hasPreviousPage: page > 1,
			hasNextPage: page < Math.ceil(total / limit)
		}
	}
}
