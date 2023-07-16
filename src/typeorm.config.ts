import { City, Country, Departament } from "@global/infrastructure/models"
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"

/**
 * @name typeOrmConfig
 * @description Configuration for typeorm connection to the database using environment variables
 */
export const typeOrmConfig: MysqlConnectionOptions = {
	type: "mysql",
	port: 3306,
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [City, Departament, Country],
	synchronize: false
}
