import { WebSiteEntity, WebSiteEntityProps } from "../entities/websites"

export interface IWebSitesRepository {
	createWebSite(props: WebSiteEntityProps): Promise<boolean>
	checkDomainAvailability(domain: string): Promise<boolean>
	checkSubdomainAvailability(subdomain: string): Promise<boolean>
	checkIfStoreHasMainWebSite(storeId: number): Promise<boolean>
	findTemplateIdByCriteria(criteria: string): Promise<string | null>
	getWebSite(target: string | null): Promise<WebSiteEntity | null>
	getWebSiteListByStoreId(storeId: number): Promise<WebSiteEntity[]>
}
