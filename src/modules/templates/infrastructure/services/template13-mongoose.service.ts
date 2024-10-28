import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DatabaseTransactionErrorException } from "@shared/infrastructure/exceptions"
import { Template13Entity } from "@templates/domain/entities/template13"
import { WebSiteTemplate } from "@templates/domain/entities/websites/webSiteTemplate"
import { Model } from "mongoose"
import { ObjectId } from "typeorm"

import { Template13Model } from "../models/template13"
import { getExternalTemplateSettings } from "../util"

@Injectable()
export class Template13MongooseService {
	constructor(
		@InjectModel(Template13Model.name) private readonly template13Model: Model<Template13Model>
	) {}

	create2 = async (templateNumber?: number, demoId?: number | string) => {
		try {
			let defaultSettings: Partial<Template13Entity> = {}

			if (templateNumber && demoId && typeof demoId === "number") {
				const template = await getExternalTemplateSettings(13, demoId)

				if (!template) throw new DatabaseTransactionErrorException("Template not found")

				const { id: _, ...templateSettings } = template

				defaultSettings = templateSettings
			}

			if (!demoId) throw new DatabaseTransactionErrorException("DemoId is required")

			const settings = Object.assign(defaultSettings, {})

			const template10Created = await new this.template13Model({
				...settings
			}).save()

			return template10Created.toObject()
		} catch (error) {
			console.log(error)
			throw new DatabaseTransactionErrorException("Has been an error creating the template15")
		}
	}

	update2 = async (_id: ObjectId, template13: WebSiteTemplate) => {
		try {
			const newSettings = Object.assign(template13, {})

			const templateUpdated = await this.template13Model.updateOne({ _id }, newSettings).exec()

			return templateUpdated.modifiedCount > 0
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error updating the template6")
		}
	}

	find = async (documentId: string) => {
		try {
			const templateSearched = await this.template13Model.findOne({ _id: documentId }).exec()

			if (!templateSearched) return null

			return this.fromModelToEntity(templateSearched.toObject())
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error getting the template6")
		}
	}

	async remove2(_id: ObjectId) {
		try {
			const isDeleted = await this.template13Model.deleteOne({ _id }).exec()

			return { deleted: isDeleted.deletedCount > 0, count: isDeleted.deletedCount }
		} catch (error) {
			console.log(error)
			throw new DatabaseTransactionErrorException("Has been an error deleting the template6")
		}
	}

	fromModelToEntity = (template13: Template13Model) => {
		return new Template13Entity({ ...template13, _id: template13._id.toString() })
	}
}
