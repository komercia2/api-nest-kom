import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import {
	Carritos,
	CategoriaTiendas,
	Entidades,
	EntidadesTiendas,
	MultipleSubscriptionCoupon,
	MultipleSubscriptionCouponToStore,
	Paises,
	Productos,
	StoreAnalytics,
	SubscriptionCoupon,
	Tiendas as Store,
	Tiendas,
	TiendasInfo,
	TiendaSuscripcionStripe,
	Users
} from "src/entities"
import { DataSource, In, Repository } from "typeorm"

import { PasswordUtil } from "../auth/utils/password.util"
import { PaginationDto } from "../users/infrastructure/dtos/paginatation.dto"
import {
	ChangePasswordDto,
	FilterSuscriptionDto,
	GetFilteredStoresDto,
	GetStoreAdminsDto,
	UpdateStoreDto,
	UpdateStoreEntitiesDto
} from "./dtos"
import { AssignStoreAdminDto } from "./dtos/assign-store-admin.dto"
import { EditSusctiptionCouponDto } from "./dtos/edit-suscription-coupon.dto"
import { FilterUsersDto } from "./dtos/filter-users.dto"
import { UnlinkStoreAdminDto } from "./dtos/unlink-store-admin.dto"
import { UpdateStorePlanDto } from "./dtos/update-store-plan.dto"
import { CouponsType } from "./enums/coupons"

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
		private readonly entidadesRepository: Repository<Entidades>,

		@InjectRepository(Users)
		private readonly usersRepository: Repository<Users>,

		@InjectRepository(Productos)
		private readonly productosRepository: Repository<Productos>,

		@InjectRepository(StoreAnalytics)
		private readonly storeAnalyticsRepository: Repository<StoreAnalytics>,

		private readonly configService: ConfigService,

		@InjectRepository(CategoriaTiendas)
		private readonly categoriaTiendasRepository: Repository<CategoriaTiendas>,

		@InjectRepository(Tiendas) private readonly tiendasRepository: Repository<Tiendas>,

		@InjectRepository(TiendasInfo) private readonly tiendasInfoRepository: Repository<TiendasInfo>,

		@InjectRepository(EntidadesTiendas)
		private readonly entidadesTiendasRepository: Repository<EntidadesTiendas>,

		private readonly datasource: DataSource,

		@InjectRepository(MultipleSubscriptionCoupon)
		private readonly multipleSubscriptionCouponRepository: Repository<MultipleSubscriptionCoupon>,

		@InjectRepository(SubscriptionCoupon)
		private readonly subscriptionCouponRepository: Repository<SubscriptionCoupon>,

		@InjectRepository(MultipleSubscriptionCouponToStore)
		private readonly multipleSubscriptionCouponToStoreRepository: Repository<MultipleSubscriptionCouponToStore>
	) {}

	async deleteSuscriptionCoupon(id: number | string) {
		const uniqueCoupon = await this.subscriptionCouponRepository.findOne({
			where: { id: String(id) }
		})
		const multipleCoupon = await this.multipleSubscriptionCouponRepository.findOne({
			where: { id: +id }
		})

		if (!uniqueCoupon && !multipleCoupon) throw new BadRequestException("Coupon not found")

		if (uniqueCoupon) {
			await this.subscriptionCouponRepository.delete(uniqueCoupon.id)
			return { message: "Coupon deleted" }
		}

		if (multipleCoupon) {
			await this.multipleSubscriptionCouponRepository.delete(multipleCoupon.id)
			await this.multipleSubscriptionCouponToStoreRepository.delete({
				couponId: multipleCoupon.id
			})
			return { message: "Coupon deleted" }
		}
	}

	async editSuscriptionCoupon(editSuscriptionCouponDto: EditSusctiptionCouponDto) {
		const { type, amount, plan, validMonths, available, id } = editSuscriptionCouponDto

		if (type === CouponsType.MULTIPLE) {
			const coupon = await this.multipleSubscriptionCouponRepository.findOne({ where: { id: +id } })

			if (!coupon) throw new BadRequestException("Coupon not found")

			await this.multipleSubscriptionCouponRepository.update(coupon.id, {
				amount,
				validMonths,
				available: available ? 1 : 0,
				plan
			})

			return { message: "Coupon updated" }
		}

		if (type === CouponsType.SINGLE) {
			const { id } = editSuscriptionCouponDto
			const coupon = await this.subscriptionCouponRepository.findOne({ where: { id: String(id) } })

			if (!coupon) throw new BadRequestException("Coupon not found")

			await this.subscriptionCouponRepository.update(coupon.id, {
				validMonths: validMonths,
				available: available ? 1 : 0,
				plan
			})

			return { message: "Coupon updated" }
		}
	}

	async updateStoreEntities(storeId: number, updateStoreEntitiesDto: UpdateStoreEntitiesDto) {
		const { entities: incomingEntities } = updateStoreEntitiesDto
		const queryRunner = this.datasource.createQueryRunner()

		try {
			await queryRunner.connect()
			await queryRunner.startTransaction()

			const currentEntities = await this.entidadesTiendasRepository.find({
				where: { tiendaId: storeId }
			})

			if (!currentEntities) {
				// If store has no entities, insert all incoming entities
				await this.entidadesTiendasRepository.insert(
					incomingEntities.map((entityId) => ({ tiendaId: storeId, entidadId: entityId }))
				)

				return { message: "Store entities updated" }
			}

			// If store has entities, compare incoming entities with current entities
			const currentEntitiesIds = currentEntities.map((entity) => entity.entidadId).sort()
			const incomingEntitiesIds = new Set(incomingEntities.sort())

			if (currentEntitiesIds.toString() === incomingEntitiesIds.toString()) {
				return { message: "Store entities are the same" }
			}

			// If incoming entities are different from current entities, delete current entities and insert incoming entities
			await this.entidadesTiendasRepository.delete({ tiendaId: storeId })

			const mappedEntities: EntidadesTiendas[] = incomingEntities.map((entityId) => {
				const entity = new EntidadesTiendas()
				entity.tiendaId = storeId
				entity.entidadId = entityId
				return entity
			})

			await this.entidadesTiendasRepository.save(mappedEntities)
			await queryRunner.commitTransaction()

			return { message: "Store entities updated" }
		} catch (error) {
			await queryRunner.rollbackTransaction()
			throw error
		} finally {
			await queryRunner.release()
		}
	}

	async deleteUser(userId: number) {
		const user = await this.usersRepository.findOne({ where: { id: userId } })

		if (!user) throw new BadRequestException("User not found")

		const queryRunner = this.datasource.createQueryRunner()
		await queryRunner.connect()
		await queryRunner.startTransaction()

		try {
			await this.usersRepository.delete(userId)

			await queryRunner.commitTransaction()

			return { message: "User deleted" }
		} catch (error) {
			await queryRunner.rollbackTransaction()
			throw error
		} finally {
			await queryRunner.release()
		}
	}

	async deleteStore(storeId: number) {
		const store = await this.storeRepository.findOne({ where: { id: storeId } })

		if (!store) throw new BadRequestException("Store not found")

		const queryRunner = this.datasource.createQueryRunner()
		await queryRunner.connect()
		await queryRunner.startTransaction()
		try {
			await this.usersRepository.delete({ tienda: storeId })
			await this.storeRepository.delete(storeId)

			await queryRunner.commitTransaction()

			return { message: "Store deleted" }
		} catch (error) {
			await queryRunner.rollbackTransaction()
			throw error
		} finally {
			await queryRunner.release()
		}
	}

	async changePassword(changePasswordDto: ChangePasswordDto) {
		const { userId, newPassword } = changePasswordDto

		const bcryptHash = PasswordUtil.hash(newPassword)
		const laravelHash = PasswordUtil.toLaravelHash(bcryptHash)

		const user = await this.usersRepository.findOne({ where: { id: userId } })

		if (!user) throw new BadRequestException("User not found")

		await this.usersRepository.update({ id: userId }, { password: laravelHash })
		return { message: "Password updated" }
	}

	async updateStore(updateStoreDto: UpdateStoreDto) {
		const { storeId } = updateStoreDto

		const store = await this.findStoreById(storeId)

		if (!store) throw new BadRequestException("Store not found")
		try {
			store.nombre = updateStoreDto.storeName
			store.subdominio = updateStoreDto.subdomain
			store.tiendasInfo.emailTienda = updateStoreDto.email
			store.tiendasInfo.telefono = updateStoreDto.phone
			store.tiendasInfo.dominio = updateStoreDto.domain
			store.tiendasInfo.descripcion = updateStoreDto.description
			store.tiendasInfo.paisesId = updateStoreDto.countryId
			store.template = updateStoreDto.template
			store.categoria = updateStoreDto.categoryId

			await Promise.all([
				await this.storeRepository.save(store),
				await this.tiendasInfoRepository.save(store.tiendasInfo)
			])

			return { success: true, message: "Store updated" }
		} catch (error) {
			return { success: false, message: "Error updating store" }
		}
	}

	async findStoreById(storeId: number) {
		return await this.storeRepository.findOne({
			where: { id: storeId },
			relations: { tiendasInfo: true }
		})
	}

	async getStoresTemplates() {
		return await this.tiendasRepository
			.createQueryBuilder("tiendas")
			.select(["tiendas.template"])
			.distinct(true)
			.getRawMany()
	}

	async getAllStoresCategories() {
		return await this.categoriaTiendasRepository.find()
	}

	async getStoreCurrentPlan(storeId: number) {
		const store = await this.storeRepository.findOne({ where: { id: storeId } })

		if (!store) throw new BadRequestException("Store not found")

		return { plan: store.tipo, expirationDate: store.fechaExpiracion }
	}

	async updateStorePlan(updateStorePlanDto: UpdateStorePlanDto) {
		const { storeId, expirationDate, plan } = updateStorePlanDto

		const store = await this.storeRepository.findOne({ where: { id: storeId } })

		if (!store) throw new BadRequestException("Store not found")

		await this.storeRepository.update(storeId, {
			fechaExpiracion: new Date(expirationDate).toISOString(),
			tipo: plan
		})

		return { message: "Store plan updated" }
	}

	async assignStoreAdmin(assignStoreAdminDto: AssignStoreAdminDto) {
		const { storeId, adminId } = assignStoreAdminDto

		const store = await this.storeRepository.findOne({ where: { id: storeId } })

		if (!store) throw new BadRequestException("Store not found")

		const admin = await this.usersRepository.findOne({ where: { id: adminId } })

		if (!admin) throw new BadRequestException("Admin not found")

		await this.usersRepository.update(adminId, { tienda: storeId })

		return { message: "Admin linked to store" }
	}

	async unlinkStoreAdmin(unlinkStoreAdminDto: UnlinkStoreAdminDto) {
		const { storeId, adminId, key } = unlinkStoreAdminDto

		if (!key) {
			throw new UnauthorizedException("Key is required")
		}

		if (key !== this.configService.get("SUPER_V2_MASTER_KEY")) {
			throw new UnauthorizedException("Invalid key")
		}

		const store = await this.storeRepository.findOne({ where: { id: storeId } })

		if (!store) throw new BadRequestException("Store not found")

		const admin = await this.usersRepository.findOne({ where: { id: adminId } })

		if (!admin) throw new BadRequestException("Admin not found")

		await this.usersRepository.update(adminId, { tienda: 0 })

		return { message: "Admin unlinked from store" }
	}

	async getStoreAdmins(getStoreAdminsDto: GetStoreAdminsDto) {
		const { page, limit, storeId } = getStoreAdminsDto

		const [admins, total] = await this.usersRepository
			.createQueryBuilder("users")
			.select([
				"users.id",
				"users.nombre",
				"users.email",
				"users.activo",
				"users.rol",
				"users.createdAt",
				"users.updatedAt",
				"usersInfo.telefono"
			])
			.where("users.tienda = :storeId", { storeId })
			.innerJoin("users.usersInfo", "usersInfo")
			.skip((page - 1) * limit)
			.take(limit)
			.getManyAndCount()

		return {
			data: admins,
			pagination: {
				total: Math.ceil(total / limit),
				page: +page,
				limit: +limit,
				hasPrev: page > 1,
				hasNext: page < Math.ceil(total / limit)
			}
		}
	}

	async getStoreInfo(storeId: number) {
		const queryBuilder = this.storeRepository
			.createQueryBuilder("store")
			.select([
				"store.id",
				"store.nombre",
				"store.subdominio",
				"store.createdAt",
				"store.logo",
				"store.fechaExpiracion",
				"store.template",
				"store.tipo",
				"ciudad2.nombreCiu",
				"tiendasInfo.emailTienda",
				"tiendasInfo.telefono",
				"tiendasInfo.dominio",
				"tiendasInfo.descripcion",
				"paises.id",
				"categoria2.id",
				"categoria2.nombreCategoria",
				"entidadesTiendas.id",
				"entidadesTiendas.entidadId"
			])
			.innerJoin("store.tiendasInfo", "tiendasInfo")
			.leftJoin("tiendasInfo.paises", "paises")
			.leftJoin("store.ciudad2", "ciudad2")
			.leftJoin("store.categoria2", "categoria2")
			.leftJoin("store.entidadesTiendas", "entidadesTiendas")
			.where("store.id = :storeId", { storeId })

		const store = await queryBuilder.getOne()

		return store
	}

	async getStoreAnalyticsSummary(storeId: number) {
		const storeVisitedEvent = "VISITED_PAGE"
		const totalProducts = this.productosRepository.count({ where: { tienda: storeId } })
		const totalSales = this.carritosRepository.count({ where: { tienda: storeId } })
		const totalViews = this.storeAnalyticsRepository.count({
			where: { storeId, event: storeVisitedEvent }
		})

		const [products, sales, views] = await Promise.all([totalProducts, totalSales, totalViews])

		return [
			{ name: "Productos publicados", value: products },
			{ name: "Ventas Realizadas", value: sales },
			{ name: "Visitas", value: views }
		]
	}

	async getUsers(filterUsersDTO: FilterUsersDto) {
		const { page, limit, id, name, email, documentIdentification, phone } = filterUsersDTO

		const queryBuilder = this.usersRepository
			.createQueryBuilder("users")
			.select([
				"users.id",
				"users.nombre",
				"users.email",
				"users.activo",
				"users.identificacion",
				"users.tipoIdentificacion",
				"tienda.id",
				"tienda.nombre",
				"users.rol",
				"users.createdAt",
				"users.updatedAt",
				"usersInfo.telefono"
			])
			.orderBy("users.createdAt", "DESC")
			.innerJoin("users.tienda2", "tienda")
			.innerJoin("users.usersInfo", "usersInfo")
			.skip((page - 1) * limit)
			.take(limit)

		if (id) {
			queryBuilder.andWhere("users.id = :id", { id })
		}

		if (name) {
			queryBuilder.andWhere("users.nombre LIKE :name", { name: `%${name}%` })
		}

		if (email) {
			queryBuilder.andWhere("users.email LIKE :email", { email: `%${email}%` })
		}

		if (documentIdentification) {
			queryBuilder.andWhere("users.identificacion LIKE :documentIdentification", {
				documentIdentification: `%${documentIdentification}%`
			})
		}

		if (phone) {
			queryBuilder.andWhere("usersInfo.telefono LIKE :phone", { phone: `%${phone}%` })
		}

		const [users, total] = await queryBuilder.getManyAndCount()

		return {
			data: users,
			pagination: {
				total: Math.ceil(total / limit),
				page: +page,
				limit: +limit,
				hasPrev: page > 1,
				hasNext: page < Math.ceil(total / limit)
			}
		}
	}

	async getSuscriptions(filterSuscriptionDto: FilterSuscriptionDto) {
		const { page, limit, id, storeId, subscriptionId, customerId, expired, toExpire, email, name } =
			filterSuscriptionDto

		const queryBuilder = this.tiendaSuscripcionStripeRepository
			.createQueryBuilder("suscripcion")
			.select([
				"users.email",
				"users.nombre",
				"suscripcion.id",
				"suscripcion.periodEnd",
				"tiendas.id",
				"tiendas.nombre",
				"suscripcion.customerId",
				"suscripcion.suscripcionId",
				"suscripcion.periodStart",
				"suscripcion.createdAt",
				"tiendas.tipo"
			])
			.innerJoin("suscripcion.tiendas", "tiendas")
			.leftJoin("tiendas.users", "users")
			.orderBy("suscripcion.createdAt", "DESC")
			.skip((page - 1) * limit)
			.take(limit)

		if (id) {
			queryBuilder.andWhere("suscripcion.id = :id", { id })
		}

		if (storeId) {
			queryBuilder.andWhere("tiendas.id = :storeId", { storeId })
		}

		if (subscriptionId) {
			queryBuilder.andWhere("suscripcion.suscripcionId LIKE :subscriptionId", {
				subscriptionId: `%${subscriptionId}%`
			})
		}

		if (customerId) {
			queryBuilder.andWhere("suscripcion.customerId LIKE :customerId", {
				customerId: `%${customerId}%`
			})
		}

		if (email) {
			queryBuilder.andWhere("users.email LIKE :email", { email: `%${email}%` })
		}

		if (name) {
			queryBuilder.andWhere("users.nombre LIKE :name", { name: `%${name}%` })
		}

		if (expired) {
			queryBuilder.andWhere("suscripcion.periodEnd <= :date", { date: new Date() })
		}

		if (toExpire) {
			const currentDate = new Date()
			const targetDate = new Date(currentDate.setDate(currentDate.getDate() + 15))

			queryBuilder.andWhere("suscripcion.periodEnd <= :date", { date: targetDate })
		}

		const [subscriptions, total] = await queryBuilder.getManyAndCount()

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
