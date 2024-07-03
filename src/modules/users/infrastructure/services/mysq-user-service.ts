import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DireccionesUsuario, Users, UsersInfo } from "src/entities"
import { Repository } from "typeorm"

import { CreateCheckoutUserDto } from "../../domain/dtos/create-checkout-user.dto"
import { IUserAdress, UserAdressEntity } from "../../domain/entities"

@Injectable()
export class MysqlUserService {
	constructor(
		@InjectRepository(DireccionesUsuario)
		private readonly userAdressRepository: Repository<DireccionesUsuario>,

		@InjectRepository(Users) private readonly userRepository: Repository<Users>,

		@InjectRepository(UsersInfo) private readonly usersInfoRepository: Repository<UsersInfo>
	) {}

	async createCheckoutUser(createCheckoutUserDto: CreateCheckoutUserDto) {
		const documentExist = await this.searchUserByDocument(createCheckoutUserDto.document)

		if (documentExist) throw new ConflictException("User already exists")

		const emailExist = await this.userRepository.findOne({
			where: { email: createCheckoutUserDto.email }
		})

		if (emailExist) throw new ConflictException("Email already exists")

		const user = new Users()
		user.tipoIdentificacion = createCheckoutUserDto.identificationType
		user.identificacion = createCheckoutUserDto.document
		user.nombre = createCheckoutUserDto.firstName
		user.email = createCheckoutUserDto.email
		user.ciudad = createCheckoutUserDto.cityId

		await this.userRepository.save(user)

		const userInfo = new UsersInfo()

		userInfo.apellido = createCheckoutUserDto.lastName
		userInfo.genero = createCheckoutUserDto.gender
		userInfo.telefono = createCheckoutUserDto.phone
		userInfo.idUser = user.id

		await this.usersInfoRepository.save(userInfo)

		const savedUser = await this.searchUserByDocument(createCheckoutUserDto.document)

		if (!savedUser) throw new InternalServerErrorException("Error creating user")

		return savedUser
	}

	async searchUserByDocument(document: string) {
		const user = await this.userRepository.findOne({
			where: { identificacion: document },
			relations: { usersInfo: true }
		})
		return user
	}

	async getUserAdressesByUserId(userId: number) {
		const addresses = await this.userAdressRepository.find({ where: { userId } })
		const filteredAddresses = addresses.filter(({ deletedAt }) => !deletedAt)
		return filteredAddresses.map(this.toEntity)
	}

	async createUserAdress(
		userId: number,
		adress: IUserAdress
	): Promise<{
		apellido: string
		barrio: string
		celular: string
		ciudad: {
			codigo_dane: string | null
			dep: number
			departamento: { id: number; nombre_dep: string; paises_id: number }
			id: number
			nombre_ciu: string
		}
		ciudadId: number
		direccion: string
		created_at: Date
		delete_at: Date | null
		id: number
		nombre: string
		tag: string
		update_at: Date | null
		user_id: number
	} | null> {
		const address = await this.userAdressRepository.save({ ...adress, userId })
		const savedAddress = await this.userAdressRepository.findOne({
			where: { id: address.id },
			relations: { ciudad: { departamento: true } }
		})

		if (!savedAddress) return null

		return {
			apellido: savedAddress.apellido,
			barrio: savedAddress.barrio,
			celular: savedAddress.celular,
			ciudad: {
				codigo_dane: savedAddress.ciudad?.codigoDane,
				dep: savedAddress.ciudad?.dep,
				departamento: {
					id: savedAddress.ciudad?.departamento.id,
					nombre_dep: savedAddress.ciudad?.departamento.nombreDep,
					paises_id: savedAddress.ciudad?.departamento.paisesId
				},
				id: savedAddress?.ciudad?.id,
				nombre_ciu: savedAddress?.ciudad?.nombreCiu
			},
			ciudadId: savedAddress?.ciudadId,
			direccion: savedAddress?.direccion,
			created_at: savedAddress.createdAt,
			delete_at: savedAddress?.deletedAt,
			id: savedAddress?.id,
			nombre: savedAddress?.nombre,
			tag: savedAddress?.tag,
			update_at: savedAddress?.updatedAt,
			user_id: savedAddress?.userId
		}
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
