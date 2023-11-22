import { StoreBannerEntity } from "../entities"

export interface IStoreBannerRepository {
	getStoreBanners(storeId: number): Promise<StoreBannerEntity[]>
}
