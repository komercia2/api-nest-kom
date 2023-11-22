export interface IStoreCustomerAccessCodeRepository {
	checkWithoutAuth(storeId: number, accessCode: string): Promise<boolean>
}
