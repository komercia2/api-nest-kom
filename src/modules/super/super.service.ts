import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import {
	Carritos,
	SuscriptoresTienda,
	Tiendas as Store,
	TiendaSuscripcionStripe
} from "src/entities"
import { Repository } from "typeorm"

import { GetFilteredStoresDto } from "./dtos"

@Injectable()
export class SuperService {
	constructor(
		@InjectRepository(Store)
		private readonly storeRepository: Repository<Store>,

		@InjectRepository(Carritos)
		private readonly carritosRepository: Repository<Carritos>,

		@InjectRepository(TiendaSuscripcionStripe)
		private readonly tiendaSuscripcionStripeRepository: Repository<TiendaSuscripcionStripe>
	) {}

	async getWeeklyGeneralStats() {
		const currentDate = new Date()

		const getAllStoresCount = this.storeRepository
			.createQueryBuilder("store")
			.where("store.createdAt >= :date", {
				date: new Date(currentDate.setDate(currentDate.getDate() - 7))
			})
			.getCount()

		const getAllSalesCount = this.carritosRepository
			.createQueryBuilder("carritos")
			.where("carritos.createdAt >= :date", {
				date: new Date(currentDate.setDate(currentDate.getDate() - 7))
			})
			.andWhere("carritos.estado = :estado", { estado: "1" })
			.getCount()

		const getAllSuscriptoresCount = this.tiendaSuscripcionStripeRepository
			.createQueryBuilder("suscriptoresTienda")
			.where("suscriptoresTienda.createdAt >= :date", {
				date: new Date(currentDate.setDate(currentDate.getDate() - 7))
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

	async getWeeklyStores() {
		const currentDate = new Date()

		const stores = await this.storeRepository
			.createQueryBuilder("store")
			.select([
				"store.id",
				"store.nombre",
				"store.subdominio",
				"store.createdAt",
				"store.fechaExpiracion",
				"store.template",
				"store.tipo",
				"store.logo",
				"ciudad2.nombreCiu",
				"tiendasInfo.emailTienda",
				"tiendasInfo.telefono",
				"tiendasInfo.dominio",
				"tiendasInfo.paises",
				"paises.pais",
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
			.orderBy("store.createdAt", "DESC")
			.where("store.createdAt >= :date", {
				date: new Date(currentDate.setDate(currentDate.getDate() - 7))
			})
			.getMany()

		return stores
	}

	async getFilteredStores(filter: GetFilteredStoresDto) {
		const { name, category, date, email, entityId, id, limit, template, page, subdomain } = filter

		const queryBuilder = this.storeRepository
			.createQueryBuilder("store")
			.select([
				"store.id",
				"store.nombre",
				"store.subdominio",
				"store.createdAt",
				"store.fechaExpiracion",
				"store.template",
				"store.tipo",
				"ciudad2.nombreCiu",
				"tiendasInfo.emailTienda",
				"tiendasInfo.telefono",
				"tiendasInfo.dominio",
				"tiendasInfo.paises",
				"paises.pais",
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

		const [stores, total] = await queryBuilder.getManyAndCount()

		return {
			data: stores,
			total: Math.ceil(total / limit),
			page,
			limit,
			hasPrev: page > 1,
			hasNext: page < Math.ceil(total / limit)
		}
	}
}
