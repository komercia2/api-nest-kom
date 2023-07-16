import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { City } from "../models"

/**
 * @name TypeOrmCityService
 * @description Service to get cities from the database using typeorm repository injected by nestjs
 */
Injectable()
export class TypeOrmCityService {
	constructor(@InjectRepository(City) private readonly typeOrmCityRepository: Repository<City>) {}

	/**
	 * @name findAllWithDepartaments
	 * @returns Promise<City[]>
	 */
	async findAllWithDepartaments(): Promise<City[]> {
		return await this.typeOrmCityRepository.find({ relations: ["dep2"] })
	}
}
