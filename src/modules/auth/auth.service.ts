import {
	ConflictException,
	Injectable,
	NotFoundException,
	Res,
	UnauthorizedException
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { InjectRepository } from "@nestjs/typeorm"
import axios from "axios"
import { Logger } from "nestjs-pino"
import {
	EntidadesTiendas,
	MedioPagos,
	MediosEnvios,
	Redes,
	TareasTienda,
	Tiendas,
	TiendasInfo,
	TiendasPages,
	Users,
	UsersInfo
} from "src/entities"
import { DataSource, Repository } from "typeorm"

import { ClodinaryService } from "../clodinary/clodinary.service"
import { SuperLoginDto } from "./dtos"
import { CreateStoreDto } from "./dtos/create-store.dto"
import { PanelLoginDto } from "./dtos/panel-login.dto"
import { PasswordUtil } from "./utils/password.util"

@Injectable()
export class AuthService {
	private readonly PHONE_TEST = "3999999993"
	private readonly PHONE_PREFIXES = ["+57", "+52", "+54", "+56", "+1", "+51", "+507"]

	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		@InjectRepository(Users) private readonly usersRepository: Repository<Users>,
		@InjectRepository(Tiendas) private readonly tiendasRepository: Repository<Tiendas>,
		@InjectRepository(UsersInfo) private readonly usersInfoRepository: Repository<UsersInfo>,
		private readonly datasource: DataSource,
		private readonly logger: Logger,
		private readonly cloudinaryService: ClodinaryService
	) {}

	async loginToPanel(panelLoginDto: PanelLoginDto) {
		const { email, password } = panelLoginDto

		const user = await this.usersRepository.findOne({ where: { email, activo: true } })

		if (!user) throw new UnauthorizedException("Invalid email or password")

		const isPasswordValid = await PasswordUtil.compare(password, user.password)

		if (!isPasswordValid) throw new UnauthorizedException("Invalid email or password")

		const payload = { id: user.id, email: user.email }

		return {
			accessToken: this.signToken(payload, this.configService.get<string>("PANEL_JWT_SECRET"))
		}
	}

	async createStore(dto: CreateStoreDto) {
		const queryRunner = this.datasource.createQueryRunner()

		this.logger.log("QueryRunner created")

		await queryRunner.connect()

		this.logger.log("QueryRunner connected")

		await queryRunner.startTransaction()

		this.logger.log("Transaction started")

		const subdomain = await this.getSubdomain(dto.nombre_tienda)

		const [userExists, phoneExists] = await Promise.all([
			this.userEmailExists(dto.email),
			this.userPhoneExists(dto.celular)
		])

		const isPrefixValid = this.PHONE_PREFIXES.some((prefix) => prefix === dto.celular)

		if (phoneExists && !isPrefixValid && dto?.celular?.length < 4) {
			throw new ConflictException("Phone already in use")
		}

		if (userExists) {
			if (userExists.tienda !== 0) throw new ConflictException("Email already in use")
		}

		try {
			const store = new Tiendas()
			store.nombre = dto.nombre_tienda
			store.ciudad = dto.ciudad ?? 0
			store.subdominio = subdomain
			store.categoria = 9
			store.logo = "logo_nuevas_tiendas.png"
			store.tipo = 9
			store.activo = true
			store.reputacion = 0
			store.template = 5
			store.fechaExpiracion = this.getCurrentDayCustomDaysAfter(20).toISOString().split("T")[0]
			store.checkWhatsapp = false
			store.numberVerified = dto.number_verified || false
			store.createdAt = new Date()

			await queryRunner.manager.save(store)

			this.logger.log("Store saved")

			const storeInfo = new TiendasInfo()

			storeInfo.tiendaInfo = store.id
			storeInfo.dominio = ""
			storeInfo.descripcion = ""
			storeInfo.telefono = dto.celular
			storeInfo.emailTienda = dto.email
			storeInfo.moneda = null
			storeInfo.paisesId = dto.pais

			await queryRunner.manager.save(storeInfo)

			this.logger.log("Store info saved")

			const shippingMethod1 = new MediosEnvios()

			shippingMethod1.idTienda = store.id
			shippingMethod1.idPais = 1
			shippingMethod1.valores = '{"envio_metodo" : "gratis", "valor": 0}'

			await queryRunner.manager.save(shippingMethod1)

			const shippingMethod2 = new MediosEnvios()

			this.logger.log("Shipping methods saved")

			shippingMethod2.idTienda = store.id
			shippingMethod2.idPais = 1
			shippingMethod2.valores = '{"envio_metodo" : "gratis", "valor": 0}'

			await queryRunner.manager.save(shippingMethod2)

			const paymentMethods = new MedioPagos()

			this.logger.log("Payment methods saved")

			paymentMethods.idMedios = store.id
			paymentMethods.convenir = true
			paymentMethods.consignacion = false
			paymentMethods.payu = false
			paymentMethods.payco = false
			paymentMethods.paypal = false
			paymentMethods.efecty = false
			paymentMethods.tienda = false
			paymentMethods.politicaEnvios = false
			paymentMethods.politicaPagos = false
			paymentMethods.contraentrega = false
			paymentMethods.mercadoPago = false
			paymentMethods.nequi = false
			paymentMethods.daviplata = false
			paymentMethods.wompi = false
			paymentMethods.credibanco = false
			paymentMethods.flow = false
			paymentMethods.paymentsWay = false
			paymentMethods.createdAt = new Date()

			await queryRunner.manager.save(paymentMethods)

			this.logger.log("Payment methods saved")

			const taks: TareasTienda[] = []

			for (let i = 1; i < 11; i++) {
				if (i === 2) continue

				const task = new TareasTienda()
				task.idTienda = store.id
				task.idTarea = i
				task.done = false

				taks.push(task)
			}

			await queryRunner.manager.save(taks)

			this.logger.log("Tasks saved")

			const socialNetworks = new Redes()

			socialNetworks.id = store.id
			socialNetworks.facebook = ""
			socialNetworks.instagram = ""
			socialNetworks.twitter = ""
			socialNetworks.youtube = ""
			socialNetworks.tiktok = ""
			socialNetworks.whatsapp = dto.celular ?? ""

			await queryRunner.manager.save(socialNetworks)

			this.logger.log("Social networks saved")

			const pages = new TiendasPages()
			pages.tiendaPage = store.id
			pages.mision = ""
			pages.vision = ""
			pages.nosotros = ""
			pages.garantia = ""
			pages.politicas = ""
			pages.imgOficina = ""
			pages.imgEquipo = ""

			await queryRunner.manager.save(pages)

			this.logger.log("Pages saved")

			console.log("User exists", userExists)

			if (userExists) {
				this.logger.log("User exists")
				if (userExists.tienda === 0) {
					userExists.tienda = store.id

					await queryRunner.manager.save(userExists)

					this.logger.log("User updated")

					if (dto.entidad) await this.assignStoreEntity(store.id, dto.entidad)
				}
			} else {
				const hashedPasswordNode = PasswordUtil.hash(dto.password)

				const user = new Users()
				user.nombre = dto.nombre
				user.email = dto.email
				user.password = PasswordUtil.toLaravelHash(hashedPasswordNode)
				user.foto = "user.jpg"
				user.ciudad = dto.ciudad ?? 0
				user.tienda = store.id ?? 0
				user.rol = 0
				user.activo = true
				user.panel = false
				user.editor = false
				user.app = false
				user.identificacion = null
				user.tipoIdentificacion = null
				user.createdAt = new Date()

				await queryRunner.manager.save(user)

				this.logger.log("User saved")

				const userInfo = new UsersInfo()

				userInfo.idUser = user.id
				userInfo.apellido = null
				userInfo.barrio = null
				userInfo.birthday = null
				userInfo.direccion = null
				userInfo.genero = null
				userInfo.reputacion = 0
				userInfo.telefono = dto.celular ?? null
				userInfo.visitas = 0
				userInfo.idUser = user.id

				await queryRunner.manager.save(userInfo)

				this.logger.log("User info saved")

				user.tienda = store.id

				if (dto.entidad) await this.assignStoreEntity(store.id, dto.entidad)

				await queryRunner.manager.save(user)

				console.log("Data saved", { store, user })
			}

			await queryRunner.commitTransaction()
			this.logger.log("Transaction committed")

			const user = await this.usersRepository.findOne({ where: { email: dto.email } })

			if (!user) throw new NotFoundException("User not found. Failure on user creation")

			await Promise.all([
				this.cloudinaryService.migrateNewStoreLogo(store.id),
				axios.post("https://api-whatsapp-production-76cf.up.railway.app/notify-store-created", {
					storeName: dto.nombre_tienda,
					storeEmail: dto.email,
					storeId: store.id,
					clientFullName: dto.nombre,
					countryId: +dto.pais
				})
			])

			return {
				id: store.id,
				nombre: store.nombre,
				subdominio: store.subdominio,
				usuario: {
					id: user.id,
					nombre: user.nombre,
					email: user.email
				}
			}
		} catch (error) {
			console.log(error)
			await queryRunner.rollbackTransaction()
			this.logger.error(`Transaction rolled back: ${error}`)
		} finally {
			await queryRunner.release()
		}
	}

	async assignStoreEntity(storeId: number, entityId: number) {
		const storeEntity = new EntidadesTiendas()

		storeEntity.tiendaId = storeId
		storeEntity.entidadId = entityId

		if (entityId === 4) await this.assignUserRole(entityId, 101)
	}

	async assignUserRole(userId: number, roleId: number) {
		const user = await this.usersRepository.findOne({ where: { id: userId } })

		if (!user) throw new NotFoundException("User not found")

		user.rol = roleId

		await this.usersRepository.save(user)
	}

	async assignStoreToUser(userId: number, storeId: number) {
		const user = await this.usersRepository.findOne({ where: { id: userId } })

		if (!user) throw new NotFoundException("User not found")

		user.tienda = storeId
		user.rol = 1

		await this.usersRepository.save(user)
	}

	async updateUserPassword(id: number, password: string) {
		const user = await this.usersRepository.findOne({ where: { id } })

		if (!user) throw new NotFoundException("User not found")

		user.password = PasswordUtil.toLaravelHash(password)

		await this.usersRepository.save(user)
	}

	async userEmailExists(email: string) {
		return await this.usersRepository.findOne({ where: { email } })
	}

	async userPhoneExists(phone: string) {
		return await this.usersInfoRepository.findOne({ where: { telefono: phone } })
	}

	getCurrentDayCustomDaysAfter(customDays: number) {
		const currentDate = new Date()
		const currentDay = currentDate.getDate()
		const currentMonth = currentDate.getMonth()
		const currentYear = currentDate.getFullYear()

		const newDate = new Date(currentYear, currentMonth, currentDay + customDays)

		return newDate
	}

	async getStoreName(storeName: string) {
		const cleanStoreName = storeName.trim().toLowerCase()

		const store = await this.tiendasRepository.findOne({ where: { nombre: cleanStoreName } })

		if (store) {
			return this.generateStoreName(cleanStoreName, false)
		}

		return this.generateStoreName(cleanStoreName, true)
	}

	async getSubdomain(storeName: string) {
		const cleanStoreName = storeName.trim().toLowerCase().replace(/\s/g, "")

		const store = await this.tiendasRepository.findOne({ where: { subdominio: cleanStoreName } })

		if (store) {
			return this.generateSubdomain(cleanStoreName, false)
		}

		return this.generateSubdomain(cleanStoreName, true)
	}

	async generateSubdomain(storeName: string, available: boolean) {
		if (!available) {
			const random = Math.floor(Math.random() * 1000)
			return `${storeName}${random}`.toLowerCase()
		}
		return storeName.toLowerCase()
	}

	async generateStoreName(storeName: string, available: boolean) {
		if (!available) {
			const random = Math.floor(Math.random() * 1000)
			return `${storeName}${random}`.toLowerCase()
		}
		return storeName.toLowerCase()
	}

	async loginToSuper(superLoginDto: SuperLoginDto) {
		const { email, password, superClientSecret } = superLoginDto

		if (!this.validateSuperClientSecret(superClientSecret)) {
			throw new UnauthorizedException("Invalid super client secret")
		}

		const user = await this.findUserByEmail(email)

		if (!user) {
			throw new UnauthorizedException("Invalid email or password")
		}

		const isPasswordValid = await PasswordUtil.compare(password, user.password)

		if (!isPasswordValid) {
			throw new UnauthorizedException("Invalid email or password")
		}

		const payload = { id: user.id, email: user.email }

		return {
			accessToken: this.signToken(payload)
		}
	}

	async getSuperUserById(id: number) {
		const user = await this.usersRepository.findOne({
			where: { id, rol: this.configService.get<number>("SUPER_ROL"), activo: true }
		})

		if (!user) {
			throw new NotFoundException("User not found")
		}
		const { id: userID, nombre, email, tienda, rol, activo } = user

		return { id: userID, nombre, email, tienda, rol, activo }
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	signToken = (payload: any, secret = this.configService.get<string>("SUPER_JWT_SECRET")) => {
		return this.jwtService.sign(payload, { secret })
	}

	async findUserByEmail(email: string) {
		return await this.usersRepository.findOne({
			where: { email, rol: this.configService.get<number>("SUPER_ROL") }
		})
	}

	validateSuperClientSecret(superClientSecret: string) {
		return superClientSecret === this.configService.get<string>("SUPER_CLIENT_SECRET")
	}
}
