import { Inject, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"

import { IUserAdress, UserAdressEntity } from "../../domain/entities"
import { IUserRepository } from "../../domain/repositories"
import { MysqlUserService } from "../services"
import { UsersInfrastructureInjectionTokens } from "../users-infrastructure-injection-tokens"

export class UserRepository implements IUserRepository {
	constructor(
		@Inject(UsersInfrastructureInjectionTokens.MySQLUserService)
		private readonly mysqlUserService: MysqlUserService,

		private readonly jwtService: JwtService,

		private readonly configService: ConfigService
	) {}

	async authenticateCheckoutUser(document: string): Promise<{
		token: string
		userData: {
			id: number
			activo: boolean
			ciudad: number
			create_at: Date | null
			email: string | null
			identificacion: string | null
			nombre: string
			direccion: string | null
			apellido: string | null
			rol: number
			tienda: number
			tipo_identificacion: string | null
			telefono: string | null
			birthday: string | null
			barrio: string | null
		}
	}> {
		const user = await this.mysqlUserService.searchUserByDocument(document)

		if (!user) throw new UnauthorizedException(`User identified with ${document} not found`)

		const token = this.jwtService.sign(
			{ userId: user.id },
			{ expiresIn: "1h", privateKey: this.configService.get<string>("JWT_SECRET") }
		)

		return {
			token,
			userData: {
				id: user.id,
				activo: user.activo,
				ciudad: user.ciudad,
				direccion: user.usersInfo.direccion,
				create_at: user.createdAt,
				email: user.email,
				identificacion: user.identificacion,
				nombre: user.nombre,
				apellido: user.usersInfo.apellido,
				rol: user.rol,
				tienda: user.tienda,
				tipo_identificacion: user.tipoIdentificacion,
				telefono: user.usersInfo.telefono,
				birthday: user.usersInfo.birthday,
				barrio: user.usersInfo.barrio
			}
		}
	}

	async createUserAdress(
		userId: number,
		adress: IUserAdress
	): Promise<{
		apellido: string
		barrio: string
		celular: string
		ciudad: {
			codigo_dane: string | null
			dep: number
			departamento: { id: number; nombre_dep: string; paises_id: number }
			id: number
			nombre_ciu: string
		}
		ciudadId: number
		direccion: string
		created_at: Date
		delete_at: Date | null
		id: number
		nombre: string
		tag: string
		update_at: Date | null
		user_id: number
	} | null> {
		return await this.mysqlUserService.createUserAdress(userId, adress)
	}

	async deleteUserAdress(userId: number, adressId: number): Promise<void> {
		await this.mysqlUserService.deleteUserAdress(userId, adressId)
	}

	async getAdressesByUserId(userId: number): Promise<UserAdressEntity[]> {
		return await this.mysqlUserService.getUserAdressesByUserId(userId)
	}
}
