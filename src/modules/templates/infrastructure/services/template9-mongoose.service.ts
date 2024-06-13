import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DatabaseTransactionErrorException } from "@shared/infrastructure/exceptions"
import { Template9Entity } from "@templates/domain/entities/template9"
import { WebSiteTemplate } from "@templates/domain/entities/websites/webSiteTemplate"
import { Model } from "mongoose"
import { ObjectId } from "typeorm"

import { Template9Model } from "../models/template9"
import { getExternalTemplateSettings } from "../util"

@Injectable()
export class Template9MongooseService {
	constructor(
		@InjectModel(Template9Model.name) private readonly template9Model: Model<Template9Model>
	) {}

	create2 = async (templateNumber?: number, demoId?: number | string) => {
		try {
			let defaultSettings: Partial<Template9Entity> = {}

			if (templateNumber && demoId && typeof demoId === "number") {
				const template = await getExternalTemplateSettings(9, demoId)

				if (!template) throw new DatabaseTransactionErrorException("Template not found")

				const { id: _, ...templateSettings } = template

				defaultSettings = templateSettings
			}

			if (!demoId) throw new DatabaseTransactionErrorException("DemoId is required")

			const settings = Object.assign(defaultSettings, {})

			const template9Created = await new this.template9Model({
				...settings
			}).save()

			return template9Created.toObject()
		} catch (error) {
			console.log(error)
			throw new DatabaseTransactionErrorException("Has been an error creating the template15")
		}
	}

	update2 = async (_id: ObjectId, template9: WebSiteTemplate) => {
		try {
			const newSettings = Object.assign(template9, {})

			const templateUpdated = await this.template9Model.updateOne({ _id }, newSettings).exec()

			return templateUpdated.modifiedCount > 0
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error updating the template6")
		}
	}

	find = async (documentId: string) => {
		try {
			const templateSearched = await this.template9Model.findOne({ _id: documentId }).exec()

			if (!templateSearched) return null

			return this.fromModelToEntity(templateSearched.toObject())
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error getting the template6")
		}
	}

	async remove2(_id: ObjectId) {
		try {
			const isDeleted = await this.template9Model.deleteOne({ _id }).exec()

			return { deleted: isDeleted.deletedCount > 0, count: isDeleted.deletedCount }
		} catch (error) {
			console.log(error)
			throw new DatabaseTransactionErrorException("Has been an error deleting the template6")
		}
	}

	fromModelToEntity = (template7: Template9Model) => {
		return new Template9Entity({ ...template7, _id: template7._id.toString() })
	}
}
