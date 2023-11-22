import { Template5Entity } from "../entities/template5"
import { Template99Entity } from "../entities/template99"

export type TemplateSetting = Template5Entity | Template99Entity

export interface ITemplateRepository {
	getTemplateSettings(template: number, storeId: string): Promise<TemplateSetting | null>
}
