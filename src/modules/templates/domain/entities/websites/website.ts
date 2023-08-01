import { checkSpecialCharacters } from "@shared/domain/utils"
import {
	SpecialCharactersFoundException,
	TemplateNotValidException
} from "@templates/domain/exceptions"

import { allowedTemplates } from "./allowedTemplates"
import { WebSiteTemplate } from "./webSiteTemplate"

interface WebSiteEntityProps {
	idPage: number
	storeId: number
	subdomain: string
	templateId: number
	domain: string
	isMain: boolean
	active: boolean
	createdAt?: Date
	updatedAt?: Date | null
	deletedAt?: Date | null
}

export class WebSiteEntity {
	readonly idPage: number
	readonly storeId: number
	readonly subdomain: string
	readonly templateId: number
	readonly domain: string | null
	readonly isMain: boolean
	readonly active: boolean
	readonly createdAt: Date
	readonly updatedAt: Date | null
	readonly deletedAt: Date | null
	readonly webSiteTemplate?: WebSiteTemplate

	constructor(props: WebSiteEntityProps) {
		this.idPage = props.idPage
		this.storeId = props.storeId
		this.subdomain = this.validateAndClean(props.subdomain)
		this.templateId = this.isValidTemplate(props.templateId)
		this.domain = this.validateAndClean(props.domain) ?? null
		this.isMain = props.isMain
		this.active = props.active
		this.createdAt = props.createdAt ?? new Date()
		this.updatedAt = props.updatedAt ?? null
		this.deletedAt = props.deletedAt ?? null
	}

	private isValidTemplate(templateId: number): number {
		if (!allowedTemplates.includes(templateId))
			throw new TemplateNotValidException("Template provided is not valid")

		return templateId
	}

	private validateAndClean(target: string): string {
		const containsSpecialCharacters = checkSpecialCharacters(target)

		if (containsSpecialCharacters)
			throw new SpecialCharactersFoundException("Special characters found")

		return target
	}
}
