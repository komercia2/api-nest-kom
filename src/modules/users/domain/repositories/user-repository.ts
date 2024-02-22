import { IUserAdress, UserAdressEntity } from "../entities"

export interface IUserRepository {
	createUserAdress(
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
		ciudad_id: number
		direccion: string
		created_at: Date
		delete_at: Date | null
		id: number
		nombre: string
		tag: string
		update_at: Date | null
		user_id: number
	} | null>
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
