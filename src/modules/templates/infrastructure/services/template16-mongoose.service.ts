import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DatabaseTransactionErrorException } from "@shared/infrastructure/exceptions"
import { Template16Entity } from "@templates/domain/entities/template16"
import { WebSiteTemplate } from "@templates/domain/entities/websites/webSiteTemplate"
import { Model } from "mongoose"
import { ObjectId } from "typeorm"

import { Template16Model } from "../models/template16"
import { getExternalTemplateSettings } from "../util"

@Injectable()
export class Template16MongooseService {
	constructor(
		@InjectModel(Template16Model.name) private readonly template16Model: Model<Template16Model>
	) {}

	create2 = async (templateNumber?: number, demoId?: number | string) => {
		try {
			let defaultSettings: Partial<Template16Entity> = {}

			if (templateNumber && demoId && typeof demoId === "number") {
				const template = await getExternalTemplateSettings(16, demoId)

				if (!template) throw new DatabaseTransactionErrorException("Template not found")

				const { id: _, ...templateSettings } = template

				defaultSettings = templateSettings
			}

			if (!demoId) throw new DatabaseTransactionErrorException("DemoId is required")

			const settings = Object.assign(defaultSettings, {})

			const template16Created = await new this.template16Model({
				...settings
			}).save()

			return template16Created.toObject()
		} catch (error) {
			console.log(error)
			throw new DatabaseTransactionErrorException("Has been an error creating the template15")
		}
	}

	update2 = async (_id: ObjectId, template16: WebSiteTemplate) => {
		try {
			const newSettings = Object.assign(template16, {})

			const templateUpdated = await this.template16Model.updateOne({ _id }, newSettings).exec()

			return templateUpdated.modifiedCount > 0
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error updating the template6")
		}
	}

	find = async (documentId: string) => {
		try {
			const templateSearched = await this.template16Model.findOne({ _id: documentId }).exec()

			if (!templateSearched) return null

			return this.fromModelToEntity(templateSearched.toObject())
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error getting the template6")
		}
	}

	async remove2(_id: ObjectId) {
		try {
			const isDeleted = await this.template16Model.deleteOne({ _id }).exec()

			return { deleted: isDeleted.deletedCount > 0, count: isDeleted.deletedCount }
		} catch (error) {
			console.log(error)
			throw new DatabaseTransactionErrorException("Has been an error deleting the template6")
		}
	}

	fromModelToEntity = (template16: Template16Model) => {
		return new Template16Entity({ ...template16, _id: template16._id.toString() })
	}
}
