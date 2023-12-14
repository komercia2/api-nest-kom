import { BankEntity } from "../entities"

export interface IBankRepository {
	getByCountryId(countryId: number): Promise<BankEntity[]>
}
