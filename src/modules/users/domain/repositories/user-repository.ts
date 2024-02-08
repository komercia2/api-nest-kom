import { IUserAdress, UserAdressEntity } from "../entities"

export interface IUserRepository {
	createUserAdress(userId: number, adress: IUserAdress): Promise<void>
	getAdressesByUserId(userId: number): Promise<UserAdressEntity[]>
	deleteUserAdress(userId: number, adressId: number): Promise<void>
	authenticateCheckoutUser(document: string): Promise<{
		token: string
		userData: {
			id: number
			activo: boolean
			ciudad: number
			create_at: Date | null
			email: string | null
			direccion: string | null
			identificacion: string | null
			nombre: string
			apellido: string | null
			rol: number
			tienda: number
			tipo_identificacion: string | null
			telefono: string | null
			birthday: string | null
			barrio: string | null
		}
	}>
}
