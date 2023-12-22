import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { InjectRepository } from "@nestjs/typeorm"
import { Request } from "express"
import { Users } from "src/entities"
import { Repository } from "typeorm"

@Injectable()
export class CheckoutJwtGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		@InjectRepository(Users) private readonly userRepository: Repository<Users>
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)

		if (!token) throw new UnauthorizedException("Token not found")

		try {
			const secret = this.configService.get<string>("JWT_SECRET") as string

			const payload = await this.verifyToken(token, secret)

			const { id } = payload

			const user = await this.findUserById(id)

			if (!user) {
				throw new UnauthorizedException(`You provided an invalid token.
			User with id ${payload.id} does not exist
			`)
			}

			request.checkoutUser = payload
		} catch (error) {
			throw new UnauthorizedException("Invalid token")
		}

		return true
	}

	private verifyToken(token: string, secret: string) {
		return this.jwtService.verifyAsync(token, { secret })
	}

	private async findUserById(id: number) {
		return this.userRepository.findOne({ where: { id } })
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? []
		return type === "Bearer" ? token : undefined
	}
}
