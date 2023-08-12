import { Template15 } from "../entities/template15"

export interface ITemplate15Repository {
	find(templateId: string): Promise<Template15 | null>
	findById(storeId: number): Promise<Template15 | null>
	create(storeId: number): Promise<Template15>
	update(storeId: number, template15: Template15): Promise<boolean>
	remove(storeId: number): Promise<boolean>
}
