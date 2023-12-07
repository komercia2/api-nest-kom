export interface IUserRepository {
	updateRole(userId: string, role: number): Promise<void>
}
