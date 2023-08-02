import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DatabaseTransactionErrorException } from "@shared/infrastructure/exceptions"
import { WebSiteEntityProps } from "@templates/domain/entities/websites"
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
}
