import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Carritos as CartEntity } from "src/entities"
import { Repository } from "typeorm"

import { FilterSalesDto } from "./dtos/filter-sales.dto"
import { FilterTotalSalesDto } from "./dtos/filter-total-sales.dto"
import { TotalSalesType } from "./enums/total-sales.enum"
import { TotalSalesRange } from "./enums/total-sales-range.enum"

@Injectable()
export class SalesService {
	constructor(
		@InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>
	) {}

	async getTotalSales(filter: FilterTotalSalesDto) {
		const { storeId, status, range, type } = filter
		const currentDate = new Date()

		const query = this.cartRepository
			.createQueryBuilder("carritos")
			.select(["sum(carritos.total) as total", "carritos.createdAt as date"])
			.where("carritos.tienda = :storeId", { storeId })
			.andWhere("carritos.estado = :status", { status })
			.andWhere("carritos.deletedAt IS NULL")

		if (range === TotalSalesRange.YEARLY) {
			query.groupBy("YEAR(carritos.createdAt)")
		}

		if (range === TotalSalesRange.MONTHLY) {
			query.groupBy("MONTH(carritos.createdAt)")
		}

		if (range === TotalSalesRange.WEEKLY) {
			query.groupBy("WEEK(carritos.createdAt)")
		}

		if (range === TotalSalesRange.DAILY) {
			query.groupBy("DAY(carritos.createdAt)")
		}

		if (type === TotalSalesType.YESTERDAY) {
			const yesterday = new Date(currentDate)
			yesterday.setDate(yesterday.getDate() - 1)
			yesterday.setHours(0, 0, 0, 0)

			const tomorrow = new Date(currentDate)
			tomorrow.setDate(tomorrow.getDate() + 1)
			tomorrow.setHours(0, 0, 0, 0)

			query.andWhere("carritos.createdAt BETWEEN :startDate AND :endDate", {
				startDate: yesterday.toISOString(),
				endDate: tomorrow.toISOString()
			})
		}

		if (type === TotalSalesType.TODAY) {
			const startDate = new Date()
			startDate.setHours(0, 0, 0, 0)

			const endDate = new Date()
			endDate.setHours(23, 59, 59, 999)

			query.andWhere("carritos.createdAt BETWEEN :startDate AND :endDate", {
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString()
			})
		}

		if (type === TotalSalesType.CURRENT_WEEK) {
			const startDate = new Date()
			startDate.setDate(startDate.getDate() - startDate.getDay())
			startDate.setHours(0, 0, 0, 0)

			const endDate = new Date()
			endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))
			endDate.setHours(23, 59, 59, 999)

			query.andWhere("carritos.createdAt BETWEEN :startDate AND :endDate", {
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString()
			})
		}

		if (type === TotalSalesType.CURRENT_MONTH) {
			const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
			startDate.setHours(0, 0, 0, 0)

			const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
			endDate.setHours(23, 59, 59, 999)

			query.andWhere("carritos.createdAt BETWEEN :startDate AND :endDate", {
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString()
			})
		}

		if (type === TotalSalesType.INTERVAL) {
			const { startDate, endDate } = filter

			const start = new Date(startDate)
			start.setHours(0, 0, 0, 0)

			const end = new Date(endDate)
			end.setHours(23, 59, 59, 999)

			query.andWhere("carritos.createdAt BETWEEN :startDate AND :endDate", {
				startDate,
				endDate
			})
		}

		if (type === TotalSalesType.PERIOD) {
			const { month, year } = filter

			const startDate = new Date(year, month - 1, 1)
			startDate.setHours(0, 0, 0, 0)

			const endDate = new Date(year, month, 0)
			endDate.setHours(23, 59, 59, 999)

			query.andWhere("carritos.createdAt BETWEEN :startDate AND :endDate", {
				startDate,
				endDate
			})
		}

		const total = await query.getRawMany()

		return total
	}

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
