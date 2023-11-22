import { StorePoliciesEntity } from "../entities"

export interface IStorePoliciesRepository {
	getStorePolicies(idTienda: number): Promise<StorePoliciesEntity | null>
}
