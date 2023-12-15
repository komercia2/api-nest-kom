import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DireccionesUsuario } from "src/entities"
import { Repository } from "typeorm"

import { UserAdressEntity } from "../../domain/entities"

@Injectable()
export class MysqlUserService {
	constructor(
		@InjectRepository(DireccionesUsuario)
		private readonly userAdressRepository: Repository<DireccionesUsuario>
	) {}

	async getUserAdressesByUserId(userId: number) {
		const addresses = await this.userAdressRepository.find({ where: { userId } })
		return addresses.map(this.toEntity)
	}

	toEntity(data: DireccionesUsuario): UserAdressEntity {
		return UserAdressEntity.create(data)
	}
}
