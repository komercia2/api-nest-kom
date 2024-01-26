import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import {
	Carritos,
	Entidades,
	Paises,
	Tiendas as Store,
	TiendaSuscripcionStripe
} from "src/entities"
import { In, Repository } from "typeorm"

import { PaginationDto } from "../users/infrastructure/dtos/paginatation.dto"
import { GetFilteredStoresDto } from "./dtos"

@Injectable()
export class SuperService {
	constructor(
		@InjectRepository(Store)
		private readonly storeRepository: Repository<Store>,

		@InjectRepository(Carritos)
		private readonly carritosRepository: Repository<Carritos>,

		@InjectRepository(TiendaSuscripcionStripe)
		private readonly tiendaSuscripcionStripeRepository: Repository<TiendaSuscripcionStripe>,

		@InjectRepository(Paises)
		private readonly paisesRepository: Repository<Paises>,

		@InjectRepository(Entidades)
		private readonly entidadesRepository: Repository<Entidades>
	) {}

	async getAvaibleEntities() {
		const avaibleEntitiesIDs = [20, 6, 23]
		return this.entidadesRepository.find({ where: { id: In(avaibleEntitiesIDs) } })
	}

	async getCountries() {
		return this.paisesRepository.find()
	}

	async getMonthlySubscriptions({ page, limit }: PaginationDto) {
		const currentDate = new Date()
		const targetDate = new Date(currentDate.setDate(currentDate.getDate() - 30))

		const [subscriptions, total] = await this.tiendaSuscripcionStripeRepository
			.createQueryBuilder("suscripcion")
			.select([
				"users.email",
				"suscripcion.id",
				"suscripcion.periodEnd",
				"tiendas.id",
				"suscripcion.customerId",
				"suscripcion.periodStart",
				"tiendas.tipo"
			])
			.innerJoin("suscripcion.tiendas", "tiendas")
			.leftJoin("tiendas.users", "users")
			.orderBy("suscripcion.periodStart", "DESC")
			.where("suscripcion.createdAt >= :date", { date: targetDate })
			.skip((page - 1) * limit)
			.take(limit)
			.getManyAndCount()

		return {
			data: subscriptions,
			pagination: {
				total: Math.ceil(total / limit),
				page: +page,
				limit: +limit,
				hasPrev: page > 1,
				hasNext: page < Math.ceil(total / limit)
			}
		}
	}

	async getMonthlyGeneralStats() {
		const currentDate = new Date()
		const targetDate = new Date(currentDate.setDate(currentDate.getDate() - 30))

		const getAllStoresCount = this.storeRepository
			.createQueryBuilder("store")
			.where("store.createdAt >= :date", {
				date: targetDate
			})
			.getCount()

		const getAllSalesCount = this.carritosRepository
			.createQueryBuilder("carritos")
			.where("carritos.createdAt >= :date", {
				date: targetDate
			})
			.andWhere("carritos.estado = :estado", { estado: "1" })
			.getCount()

		const getAllSuscriptoresCount = this.tiendaSuscripcionStripeRepository
			.createQueryBuilder("suscriptoresTienda")
			.where("suscriptoresTienda.createdAt >= :date", {
				date: targetDate
			})
			.getCount()

		const [storesCount, salesCount, suscriptoresCount] = await Promise.all([
			getAllStoresCount,
			getAllSalesCount,
			getAllSuscriptoresCount
		])

		return {
			storesCount: { count: storesCount },
			salesCount: { count: salesCount },
			subscribersCount: { count: suscriptoresCount }
		}
	}

	async getPagedMonthlyStores(paginationDto: PaginationDto) {
		const { page, limit } = paginationDto
		const currentDate = new Date()
		const targetDate = new Date(currentDate.setDate(currentDate.getDate() - 30))

		const storesQuery = this.storeRepository
			.createQueryBuilder("store")
			.select([
				"store.id",
				"store.nombre",
				"store.subdominio",
				"store.createdAt",
				"store.fechaExpiracion",
				"store.tipo",
				"store.logo",
				"ciudad2.nombreCiu",
				"tiendasInfo.emailTienda",
				"tiendasInfo.telefono",
				"tiendasInfo.dominio",
				"tiendasInfo.paises",
				"paises.pais"
			])
			.innerJoin("store.tiendasInfo", "tiendasInfo")
			.leftJoin("tiendasInfo.paises", "paises")
			.leftJoin("store.ciudad2", "ciudad2")
			.orderBy("store.createdAt", "DESC")
			.where("store.createdAt >= :date", {
				date: targetDate
			})
			.skip((page - 1) * limit)
			.take(limit)
			.getMany()

		const totalStoresQuery = this.storeRepository
			.createQueryBuilder("store")
			.where("store.createdAt >= :date", {
				date: targetDate
			})
			.getCount()

		const [stores, total] = await Promise.all([storesQuery, totalStoresQuery])

		return {
			data: stores,
			pagination: {
				total: Math.ceil(total / limit),
				page: +page,
				limit: +limit,
				hasPrev: page > 1,
				hasNext: page < Math.ceil(total / limit)
			}
		}
	}

	async getFilteredStores(filter: GetFilteredStoresDto) {
		const {
			name,
			category,
			date,
			email,
			entityId,
			id,
			suscription,
			limit,
			template,
			page,
			subdomain,
			country,
			city,
			expired,
			withoutExpire,
			toExpire
		} = filter

		const queryBuilder = this.storeRepository
			.createQueryBuilder("store")
			.select([
				"store.id",
				"store.nombre",
				"store.subdominio",
				"store.createdAt",
				"store.logo",
				"store.checkWhatsapp",
				"store.fechaExpiracion",
				"store.template",
				"store.tipo",
				"ciudad2.nombreCiu",
				"tiendasInfo.emailTienda",
				"tiendasInfo.telefono",
				"tiendasInfo.dominio",
				"paises.id",
				"categoria2.id",
				"categoria2.nombreCategoria",
				"entidadesTiendas.id",
				"entidadesTiendas.entidadId",
				"users.nombre",
				"users.email"
			])
			.innerJoin("store.tiendasInfo", "tiendasInfo")
			.leftJoin("store.users", "users")
			.leftJoin("tiendasInfo.paises", "paises")
			.leftJoin("store.ciudad2", "ciudad2")
			.leftJoin("store.categoria2", "categoria2")
			.leftJoin("store.entidadesTiendas", "entidadesTiendas")
			.leftJoinAndMapMany("store.tareasTiendas", "store.tareasTiendas", "tasks")
			.loadRelationCountAndMap("store.productos", "store.productos")
			.loadRelationCountAndMap("store.carritos", "store.carritos")
			.orderBy("store.createdAt", date)
			.skip((page - 1) * limit)
			.take(limit)

		if (id) {
			queryBuilder.andWhere("store.id = :id", { id })
		}

		if (name) {
			queryBuilder.andWhere("store.nombre LIKE :name", { name: `%${name}%` })
		}

		if (subdomain) {
			queryBuilder.andWhere("store.subdominio LIKE :subdomain", { subdomain: `%${subdomain}%` })
		}

		if (email) {
			queryBuilder.andWhere("tiendasInfo.emailTienda LIKE :email", { email: `%${email}%` })
		}

		if (category) {
			queryBuilder.andWhere("categoria2.nombreCategoria LIKE :category", {
				category: `%${category}%`
			})
		}

		if (template) {
			queryBuilder.andWhere("store.template = :template", { template })
		}

		if (entityId) {
			queryBuilder.andWhere("entidadesTiendas.entidadId = :entityId", { entityId })
		}

		if (city) {
			queryBuilder.andWhere("ciudad2.nombreCiu LIKE :city", { city: `%${city}%` })
		}

		if (suscription) {
			queryBuilder.andWhere("store.tipo = :suscription", { suscription })
		}

		if (expired) {
			queryBuilder.andWhere("store.fechaExpiracion <= :date", { date: new Date() })
		}

		if (withoutExpire) {
			queryBuilder.andWhere("store.fechaExpiracion > :date", { date: new Date() })
		}

		if (country) {
			queryBuilder.andWhere("paises.pais LIKE :country", { country: `%${country}%` })
		}

		if (toExpire) {
			const currentDate = new Date()
			const targetDate = new Date(currentDate.setDate(currentDate.getDate() + 15))

			queryBuilder.andWhere("store.fechaExpiracion <= :date", { date: targetDate })
		}

		const [stores, total] = await queryBuilder.getManyAndCount()

		return {
			data: stores,
			pagination: {
				total: Math.ceil(total / limit),
				page: +page,
				limit: +limit,
				hasPrev: page > 1,
				hasNext: page < Math.ceil(total / limit)
			}
		}
	}
}
