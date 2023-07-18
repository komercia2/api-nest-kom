import { City, Country, Departament } from "@global/infrastructure/models"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm"

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	createTypeOrmOptions = (): TypeOrmModuleOptions => ({
		type: "mysql",
		port: this.configService.get<number>("DB_PORT"),
		host: this.configService.get<string>("DB_HOST"),
		username: this.configService.get<string>("DB_USER"),
		database: this.configService.get<string>("DB_NAME"),
		password: this.configService.get<string>("DB_PASSWORD"),
		entities: [City, Departament, Country]
	})
}
