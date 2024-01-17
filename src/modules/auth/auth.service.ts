import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { InjectRepository } from "@nestjs/typeorm"
import { Users } from "src/entities"
import { Repository } from "typeorm"

import { SuperLoginDto } from "./dtos"
import { PasswordUtil } from "./utils/password.util"

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		@InjectRepository(Users) private readonly usersRepository: Repository<Users>
	) {}

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
	signToken = (payload: any) => {
		return this.jwtService.sign(payload, {
			secret: this.configService.get<string>("SUPER_JWT_SECRET")
		})
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
