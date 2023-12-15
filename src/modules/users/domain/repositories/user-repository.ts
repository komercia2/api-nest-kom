import { UserAdressEntity } from "../entities"

export interface IUserRepository {
	getAdressesByUserId(userId: number): Promise<UserAdressEntity[]>
}
