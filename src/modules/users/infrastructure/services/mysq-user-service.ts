import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DireccionesUsuario, Users } from "src/entities"
import { Repository } from "typeorm"

import { IUserAdress, UserAdressEntity } from "../../domain/entities"

@Injectable()
export class MysqlUserService {
	constructor(
		@InjectRepository(DireccionesUsuario)
		private readonly userAdressRepository: Repository<DireccionesUsuario>,

		@InjectRepository(Users) private readonly userRepository: Repository<Users>
	) {}

	async searchUserByDocument(document: string) {
		const user = await this.userRepository.findOne({
			where: { identificacion: document },
			relations: { usersInfo: true }
		})
		return user
	}

	async getUserAdressesByUserId(userId: number) {
		const addresses = await this.userAdressRepository.find({ where: { userId } })
		return addresses.map(this.toEntity)
	}

	createUserAdress(userId: number, adress: IUserAdress) {
		return this.userAdressRepository.insert({ ...adress, userId })
	}

	async deleteUserAdress(userId: number, adressId: number) {
		const adressExistis = await this.userAdressRepository.findOne({
			where: { userId, id: adressId }
		})

		if (!adressExistis) {
			throw new Error(`User adress with id ${adressId} does not exist`)
		}

		await this.userAdressRepository.delete({ userId, id: adressId })
	}

	toEntity(data: DireccionesUsuario): UserAdressEntity {
		return UserAdressEntity.create(data)
	}
}
