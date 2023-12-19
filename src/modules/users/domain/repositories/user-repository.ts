import { IUserAdress, UserAdressEntity } from "../entities"

export interface IUserRepository {
	createUserAdress(userId: number, adress: IUserAdress): Promise<void>
	getAdressesByUserId(userId: number): Promise<UserAdressEntity[]>
	deleteUserAdress(userId: number, adressId: number): Promise<void>
}
