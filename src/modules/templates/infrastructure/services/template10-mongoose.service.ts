import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DatabaseTransactionErrorException } from "@shared/infrastructure/exceptions"
import { Template10Entity } from "@templates/domain/entities/template10"
import { WebSiteTemplate } from "@templates/domain/entities/websites/webSiteTemplate"
import { Model } from "mongoose"
import { ObjectId } from "typeorm"

import { Template10Model } from "../models/template10"
import { getExternalTemplateSettings } from "../util"

@Injectable()
export class Template10MongooseService {
	constructor(
		@InjectModel(Template10Model.name) private readonly template10Model: Model<Template10Model>
	) {}

	create2 = async (templateNumber?: number, demoId?: number | string) => {
		try {
			let defaultSettings: Partial<Template10Entity> = {}

			if (templateNumber && demoId && typeof demoId === "number") {
				const template = await getExternalTemplateSettings(10, demoId)

				if (!template) throw new DatabaseTransactionErrorException("Template not found")

				const { id: _, ...templateSettings } = template

				defaultSettings = templateSettings
			}

			if (!demoId) throw new DatabaseTransactionErrorException("DemoId is required")

			const settings = Object.assign(defaultSettings, {})

			const template10Created = await new this.template10Model({
				...settings
			}).save()

			return template10Created.toObject()
		} catch (error) {
			console.log(error)
			throw new DatabaseTransactionErrorException("Has been an error creating the template15")
		}
	}

	update2 = async (_id: ObjectId, template10: WebSiteTemplate) => {
		try {
			const newSettings = Object.assign(template10, {})

			const templateUpdated = await this.template10Model.updateOne({ _id }, newSettings).exec()

			return templateUpdated.modifiedCount > 0
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error updating the template6")
		}
	}

	find = async (documentId: string) => {
		try {
			const templateSearched = await this.template10Model.findOne({ _id: documentId }).exec()

			if (!templateSearched) return null

			return this.fromModelToEntity(templateSearched.toObject())
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error getting the template6")
		}
	}

	async remove2(_id: ObjectId) {
		try {
			const isDeleted = await this.template10Model.deleteOne({ _id }).exec()

			return { deleted: isDeleted.deletedCount > 0, count: isDeleted.deletedCount }
		} catch (error) {
			console.log(error)
			throw new DatabaseTransactionErrorException("Has been an error deleting the template6")
		}
	}

	fromModelToEntity = (template10: Template10Model) => {
		return new Template10Entity({ ...template10, _id: template10._id.toString() })
	}
}
