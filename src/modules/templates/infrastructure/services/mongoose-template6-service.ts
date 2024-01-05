import { Injectable } from "@nestjs/common"
import { OnEvent } from "@nestjs/event-emitter"
import { InjectModel } from "@nestjs/mongoose"
import { DatabaseTransactionErrorException } from "@shared/infrastructure/exceptions"
import { Template6Entity } from "@templates/domain/entities/template6/template6"
import { WebSiteTemplate } from "@templates/domain/entities/websites/webSiteTemplate"
import { plainToClass } from "class-transformer"
import { Model } from "mongoose"
import { ObjectId } from "typeorm"

import { Template6Model } from "../models/template6/template6-model"

@Injectable()
export class MongooseTemplate6Service {
	constructor(
		@InjectModel(Template6Model.name) private readonly template6Model: Model<Template6Model>
	) {}

	public async create2() {
		try {
			const defaultSettings = new Template6Entity()
			const settings = Object.assign(defaultSettings, {})

			const template6Created = await new this.template6Model({ ...settings }).save()

			return template6Created.toObject()
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error creating the template6")
		}
	}

	update2 = async (_id: ObjectId, template15: WebSiteTemplate) => {
		try {
			const newSettings = Object.assign(template15, {})

			const templateUpdated = await this.template6Model.updateOne({ _id }, newSettings).exec()

			return templateUpdated.modifiedCount > 0
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error updating the template6")
		}
	}

	find = async (documentId: string) => {
		try {
			const templateSearched = await this.template6Model.findOne({ _id: documentId }).exec()

			if (!templateSearched) return null

			return this.fromModelToEntity(templateSearched.toObject())
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error getting the template6")
		}
	}

	// @OnEvent("website.6.deleted")
	async remove2(_id: ObjectId) {
		try {
			const isDeleted = await this.template6Model.deleteOne({ _id }).exec()

			return { deleted: isDeleted.deletedCount > 0, count: isDeleted.deletedCount }
		} catch (error) {
			console.log(error)
			throw new DatabaseTransactionErrorException("Has been an error deleting the template6")
		}
	}

	fromModelToEntity = (template6: Template6Model) => {
		return plainToClass(Template6Entity, template6)
	}
}
