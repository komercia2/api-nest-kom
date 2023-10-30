import { Template5Entity } from "../entities/template5"

export type TemplateSetting = Template5Entity

export interface ITemplateRepository {
	getTemplateSettings(template: number, storeId: string): Promise<TemplateSetting | null>
}
