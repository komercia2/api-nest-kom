import { Inject, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DatabaseTransactionErrorException } from "@shared/infrastructure/exceptions"
import { UpdateWebSiteDto } from "@templates/application/command/dtos"
import { TemplateNotFoundException } from "@templates/application/exceptions"
import { Template15 } from "@templates/domain/entities/template15"
import { WebSiteEntity, WebSiteEntityProps } from "@templates/domain/entities/websites"
import { WebSiteTemplate } from "@templates/domain/entities/websites/webSiteTemplate"
import { WebsiteNotAvaibleException } from "@templates/domain/exceptions"
import { isValidObjectId, Model, ObjectId } from "mongoose"

import { InfrastructureInjectionTokens } from "../infrastructure-injection.tokens"
import { WebSiteModel } from "../models/website"
import { createObjectIdFromHexString } from "../util"
import { Template15MongoService } from "./template15Mongoose.service"

@Injectable()
export class WebsiteMongooseService {
	private readonly validServices = new Map([[15, this.template15MongoService]])

	constructor(
		@InjectModel(WebSiteModel.name) private readonly websiteModel: Model<WebSiteModel>,

		@Inject(InfrastructureInjectionTokens.Template15MongoService)
		private readonly template15MongoService: Template15MongoService
	) {}

	create = async (data: WebSiteEntityProps) => {
		try {
			const { templateNumber } = data
			let websiteCreated

			const repository = this.getRepositoryByTemplateNumber(templateNumber)

			if (!repository) {
				websiteCreated = await this.saveWebSite(data, null)
			} else {
				const { _id } = await repository.create2()
				websiteCreated = await this.saveWebSite(data, _id)
			}

			return !!websiteCreated?._id
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error creating the website")
		}
	}

	getWebSite = async (templateId: string): Promise<WebSiteEntity> => {
		try {
			const isValidTemplateId = isValidObjectId(templateId)
			const parsedTemplateId = isValidTemplateId ? createObjectIdFromHexString(templateId) : null

			const getWebSiteDataOperation = this.websiteModel
				.findOne({ templateId: parsedTemplateId })
				.exec()
			const getTemplateOperation = this.template15MongoService.find(templateId)

			const results = await Promise.allSettled([getWebSiteDataOperation, getTemplateOperation])

			const [webSiteDataResult, templateResult] = results

			if (webSiteDataResult.status === "rejected") throw new Error("WebSite not found")

			const webSiteData = webSiteDataResult.value

			if (!webSiteData) throw new Error("WebSite not found")

			const template = templateResult.status === "fulfilled" ? templateResult.value : null

			return this.fromModelToEntity(webSiteData.toObject(), template)
		} catch (error) {
			throw new DatabaseTransactionErrorException(
				"Has been an error getting the website and template"
			)
		}
	}

	update = async (props: UpdateWebSiteDto) => {
		try {
			const { _id, ...data } = props

			const websiteUpdated = await this.websiteModel.findOneAndUpdate({ _id }, data, { new: true })

			if (!websiteUpdated) throw new WebsiteNotAvaibleException("Website not found to update")

			return websiteUpdated
		} catch (error) {
			if (error instanceof WebsiteNotAvaibleException) throw error

			throw new DatabaseTransactionErrorException("Has been an error updating the website")
		}
	}

	private saveWebSite = async (data: WebSiteEntityProps, templateId: ObjectId | null) => {
		try {
			return await new this.websiteModel({
				...data,
				templateId
			}).save()
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error saving the website")
		}
	}

	private getRepositoryByTemplateNumber = (templateNumber: number) => {
		const repository = this.validServices.get(templateNumber)
		return repository
	}

	verifyDomainAvailability = async (domain: string) => {
		try {
			const searchedDomain = await this.websiteModel.findOne({ domain })
			return !!searchedDomain
		} catch (error) {
			throw new DatabaseTransactionErrorException(
				"Has been an error verifying the domain availability"
			)
		}
	}

	verifySubDomainAvailability = async (subdomain: string) => {
		try {
			const searchedSubDomain = await this.websiteModel.findOne({ subdomain })
			return !!searchedSubDomain
		} catch (error) {
			throw new DatabaseTransactionErrorException(
				"Has been an error verifying the subdomain availability"
			)
		}
	}

	getWebsitesById = async (storeId: number) => {
		try {
			const websites = await this.websiteModel.find({ storeId })
			return websites.map((website) => this.fromModelToEntity(website.toObject()))
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error getting the websites")
		}
	}

	checkIfStoreHasMainWebSite = async (storeId: number) => {
		try {
			const website = await this.websiteModel.findOne({ storeId, isMain: true })
			return !!website
		} catch (error) {
			throw new DatabaseTransactionErrorException(
				"Has been an error checking if the store has a main website"
			)
		}
	}

	findTemplateIdByCriteria = async (criteria: string) => {
		try {
			const searchQuery = [{ domain: criteria }, { subdomain: criteria }]
			const template = await this.websiteModel.findOne({ $or: searchQuery, active: true }).exec()

			if (!template)
				throw new TemplateNotFoundException(`Template not found for criteria ${criteria}`)

			if (!template?.templateId) return null

			return template.templateId.toString()
		} catch (error) {
			throw new DatabaseTransactionErrorException(
				"There was an error finding the template id by criteria"
			)
		}
	}

	fromModelToEntity = (website: WebSiteModel, template?: WebSiteTemplate | null) => {
		return new WebSiteEntity({
			_id: String(website._id),
			domain: website.domain,
			subdomain: website.subdomain,
			storeId: website.storeId,
			active: website.active,
			isMain: website.isMain,
			templateId: website.templateId?.toString() ?? null,
			templateNumber: website.templateNumber,
			webSiteTemplate: template
		})
	}
}
