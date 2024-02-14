import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Request } from "express"

@Injectable()
export class AddiApplicationCallbackGuard implements CanActivate {
	constructor(private readonly configService: ConfigService) {}

	canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const authHeader = this.getAuthHeader(request)

		if (!authHeader) throw new UnauthorizedException("Authorization credentials are required")

		const { username, password } = this.decodeBase64Credentials(authHeader)

		const isValid = this.isValidCredentials({ username, password })

		if (!isValid) throw new UnauthorizedException("Invalid credentials")

		return Promise.resolve(true)
	}

	isValidCredentials(credentials: ICredentials) {
		const { username, password } = credentials
		const expectedUsername = this.configService.get<string>("ADDI_USERNAME")
		const expectedPassword = this.configService.get<string>("ADDI_PASSWORD")

		return username === expectedUsername && password === expectedPassword
	}

	decodeBase64Credentials(authHeader: string): ICredentials {
		const [codedUsername, codedPassword] = authHeader.split(":")
		const username = Buffer.from(codedUsername, "base64").toString()
		const password = Buffer.from(codedPassword, "base64").toString()
		return { username, password }
	}

	getAuthHeader(request: Request) {
		return request.headers.authorization
	}
}

interface ICredentials {
	username: string
	password: string
}
