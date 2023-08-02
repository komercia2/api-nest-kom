import { WebSiteEntity, WebSiteEntityProps } from "../entities/websites"

export interface IWebSitesRepository {
	createWebSite(props: WebSiteEntityProps): Promise<boolean>
	checkDomainAvailability(domain: string): Promise<boolean>
	checkSubdomainAvailability(subdomain: string): Promise<boolean>
	getWebSiteByDomain(domain: string): Promise<WebSiteEntity | null>
	getWebSiteListByStoreId(storeId: number): Promise<WebSiteEntity[]>
}
