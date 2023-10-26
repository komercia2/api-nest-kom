import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Ciudades } from "src/entities"
import { Repository } from "typeorm"

@Injectable()
export class MySQLCityService {
	constructor(@InjectRepository(Ciudades) private readonly cityRepository: Repository<Ciudades>) {}

	getAll = async () => {
		return await this.cityRepository.find({
			relations: { departamento: true }
		})
	}
}
