import { checkSpecialCharacters } from "@shared/domain/utils"
import { SpecialCharactersFoundException } from "@templates/domain/exceptions"

import { WebSiteTemplate } from "./webSiteTemplate"

export interface WebSiteEntityProps {
	_id?: string
	storeId: number
	subdomain: string
	templateNumber: number
	templateId?: string | null
	domain: string
	isMain: boolean
	active: boolean
	webSiteTemplate?: WebSiteTemplate
	createdAt?: Date
	updatedAt?: Date | null
	deletedAt?: Date | null
}

export class WebSiteEntity {
	// TODO: template cant be changed
	readonly _id?: string
	readonly storeId: number
	readonly subdomain: string
	readonly templateNumber: number
	readonly templateId: string | null
	readonly domain: string | null
	readonly isMain: boolean
	readonly active: boolean
	readonly createdAt: Date
	readonly updatedAt: Date | null
	readonly deletedAt: Date | null
	readonly webSiteTemplate?: WebSiteTemplate

	constructor(props: WebSiteEntityProps) {
		this._id = props._id
		this.storeId = props.storeId
		this.subdomain = this.validateAndClean(props.subdomain)
		this.templateNumber = props.templateNumber
		this.templateId = props.templateId ?? null
		this.domain = this.validateAndClean(props.domain) ?? null
		this.isMain = props.isMain
		this.active = props.active
		this.createdAt = props.createdAt ?? new Date()
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
