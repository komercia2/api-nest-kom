import { InjectModel } from "@nestjs/mongoose"
import { DatabaseTransactionErrorException } from "@shared/infrastructure/exceptions"
import { Template12Entity } from "@templates/domain/entities/template12"
import { WebSiteTemplate } from "@templates/domain/entities/websites/webSiteTemplate"
import { Model } from "mongoose"
import { ObjectId } from "typeorm"

import { Template12Model } from "../models/template12"
import { getExternalTemplateSettings } from "../util"

export class Template12MongooseService {
	constructor(@InjectModel(Template12Model.name) private template12Model: Model<Template12Model>) {}

	create2 = async (templateNumber?: number, demoId?: number | string) => {
		try {
			let defaultSettings: Partial<Template12Entity> = {}

			if (templateNumber && demoId && typeof demoId === "number") {
				const template = await getExternalTemplateSettings(12, demoId)

				if (!template) throw new DatabaseTransactionErrorException("Template not found")

				const { id: _, ...templateSettings } = template

				defaultSettings = templateSettings
			}

			if (!demoId) throw new DatabaseTransactionErrorException("DemoId is required")

			const settings = Object.assign(defaultSettings, {})

			const templateWapiCreated = await new this.template12Model({
				...settings
			}).save()

			return templateWapiCreated.toObject()
		} catch (error) {
			console.log(error)
			throw new DatabaseTransactionErrorException("Has been an error creating the template15")
		}
	}

	update2 = async (_id: ObjectId, template12: WebSiteTemplate) => {
		try {
			const newSettings = Object.assign(template12, {})

			const templateUpdated = await this.template12Model.updateOne({ _id }, newSettings).exec()

			return templateUpdated.modifiedCount > 0
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error updating the template6")
		}
	}

	find = async (documentId: string) => {
		try {
			const templateSearched = await this.template12Model.findOne({ _id: documentId }).exec()

			if (!templateSearched) return null

			return this.fromModelToEntity(templateSearched.toObject())
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error getting the template6")
		}
	}

	async remove2(_id: ObjectId) {
		try {
			const isDeleted = await this.template12Model.deleteOne({ _id }).exec()

			return { deleted: isDeleted.deletedCount > 0, count: isDeleted.deletedCount }
		} catch (error) {
			console.log(error)
			throw new DatabaseTransactionErrorException("Has been an error deleting the template6")
		}
	}

	fromModelToEntity = (template12: Template12Model) => {
		return new Template12Entity({ ...template12, _id: template12._id.toString() })
	}
}
