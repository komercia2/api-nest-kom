import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Departamentos } from "src/entities"
import { Repository } from "typeorm"

import { DepartamentEntity } from "../../domain/entities"

@Injectable()
export class MySQLDepartamentService {
	constructor(
		@InjectRepository(Departamentos)
		private readonly departamentRepository: Repository<Departamentos>
	) {}

	async getByCountry(countryId: number) {
		const departaments = await this.departamentRepository.find({ where: { paisesId: countryId } })
		return departaments.map((departament) => this.toDepartamentEntity(departament))
	}

	async getAll() {
		const departaments = await this.departamentRepository.find()
		return departaments.map((departament) => this.toDepartamentEntity(departament))
	}

	private toDepartamentEntity(departament: Departamentos): DepartamentEntity {
		return new DepartamentEntity({
			id: departament.id,
			nombre_dep: departament.nombreDep,
			paises_id: departament.paisesId
		})
	}
}
