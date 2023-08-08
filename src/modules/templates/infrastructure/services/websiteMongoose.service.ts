import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DatabaseTransactionErrorException } from "@shared/infrastructure/exceptions"
import { WebSiteEntity, WebSiteEntityProps } from "@templates/domain/entities/websites"
import { Model } from "mongoose"

import { WebSiteModel } from "../models/website"

@Injectable()
export class WebsiteMongooseService {
	constructor(@InjectModel(WebSiteModel.name) private readonly websiteModel: Model<WebSiteModel>) {}

	create = async (data: WebSiteEntityProps) => {
		try {
			const websiteCreated = await new this.websiteModel(data).save()
			return !!websiteCreated._id
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error creating the website")
		}
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
			console.log(error)
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

	fromModelToEntity = (website: WebSiteModel) => {
		return new WebSiteEntity({
			_id: String(website._id),
			domain: website.domain,
			subdomain: website.subdomain,
			storeId: website.storeId,
			active: website.active,
			isMain: website.isMain,
			templateNumber: website.templateNumber
		})
	}
}
