import { checkSpecialCharacters, getUTCDate } from "@shared/domain/utils"
import { SpecialCharactersFoundException } from "@templates/domain/exceptions"

import { WebSiteTemplate } from "./webSiteTemplate"

export interface WebSiteEntityProps {
	_id?: string
	storeId: number
	subdomain: string | null
	templateNumber: number
	templateId?: string | null
	domain: string | null
	isMain: boolean
	active: boolean
	webSiteTemplate?: WebSiteTemplate | null
	createdAt?: Date
	updatedAt?: Date | null
	deletedAt?: Date | null
}

export interface IStoreInfo {
	id: number
	template: number
}

export class WebSiteEntity {
	// TODO: template cant be changed
	readonly _id?: string
	readonly storeId: number
	readonly subdomain: string | null
	readonly templateNumber: number
	readonly templateId?: string | null
	readonly domain: string | null
	readonly isMain: boolean
	readonly active: boolean
	readonly createdAt: Date
	readonly updatedAt: Date | null
	readonly deletedAt: Date | null
	readonly webSiteTemplate?: WebSiteTemplate | null

	constructor(props: WebSiteEntityProps) {
		this._id = props._id
		this.storeId = props.storeId
		this.subdomain = props.subdomain ? props.subdomain : null
		this.templateNumber = props.templateNumber
		this.templateId = props.templateId
		this.domain = props.domain ?? null
		this.isMain = props.isMain
		;(this.active = props.active),
			(this.webSiteTemplate = props.webSiteTemplate),
			(this.createdAt = props.createdAt ?? new Date(getUTCDate()))
		this.updatedAt = props.updatedAt ?? null
		this.deletedAt = props.deletedAt ?? null
	}

	private validateAndClean(target: string): string {
		const containsSpecialCharacters = checkSpecialCharacters(target)

		if (containsSpecialCharacters)
			throw new SpecialCharactersFoundException("Special characters found")

		return target.trim()
	}
}
