import { IStoreInfo, WebSiteEntity, WebSiteEntityProps } from "../entities/websites"
import { WebSiteTemplate } from "../entities/websites/webSiteTemplate"
import { TemplateRepository } from "../types"

export interface IWebSitesRepository {
	createWebSite(props: WebSiteEntityProps): Promise<boolean>
	checkDomainAvailability(domain: string): Promise<boolean>
	checkSubdomainAvailability(subdomain: string): Promise<boolean>
	checkIfStoreHasMainWebSite(storeId: number): Promise<boolean>
	findTemplateIdByCriteria(criteria: string): Promise<string | null>
	findMySQLTemplateByCriteria(criteria: string, isDomain: boolean): Promise<IStoreInfo | null>
	findTemplateRepository(templateNumber: number): Promise<TemplateRepository | null>
	getWebSite(target: string | null, criteria?: string): Promise<WebSiteEntity | IStoreInfo | null>
	getWebSiteListByStoreId(storeId: number): Promise<WebSiteEntity[]>
	updateWebsiteInfo(
		_id: string,
		props: { isMain: boolean; active: boolean }
	): Promise<WebSiteEntity>
	updateSettings(_id: string, templateNumber: number, settings: WebSiteTemplate): Promise<boolean>
	delete(_id: string, templateId: string): Promise<boolean>
}
