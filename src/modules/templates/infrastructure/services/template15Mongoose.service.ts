import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DatabaseTransactionErrorException } from "@shared/infrastructure/exceptions"
import { Template15 as Template15Entity } from "@templates/domain/entities/template15"
import { Template15Model } from "@templates/infrastructure/models/template15/template15"
import { plainToClass } from "class-transformer"
import { Model } from "mongoose"
import { ObjectId } from "typeorm"

import { createObjectIdFromHexString } from "../util"

@Injectable()
export class Template15MongoService {
	constructor(
		@InjectModel(Template15Model.name) private readonly template15Model: Model<Template15Model>
	) {}

	create = async (storeId: number, defaultSettings: Template15Entity) => {
		try {
			const settings = Object.assign(defaultSettings, {})
			const template15Created = await new this.template15Model({ storeId, ...settings }).save()

			return this.fromModelToEntity(template15Created.toObject())
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error creating the template15")
		}
	}

	create2 = async () => {
		try {
			const defaultSettings = new Template15Entity()
			const settings = Object.assign(defaultSettings, {})
			const template15Created = await new this.template15Model({ ...settings }).save()

			return template15Created.toObject()
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error creating the template15")
		}
	}

	find = async (documentId: string) => {
		try {
			const parsedId = createObjectIdFromHexString(documentId)
			const templateSearched = await this.template15Model.findOne({ _id: parsedId }).exec()

			if (!templateSearched) return null

			return this.fromModelToEntity(templateSearched.toObject())
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error getting the template15")
		}
	}

	findById = async (storeId: number) => {
		try {
			const templateSearched = await this.template15Model.findOne({ storeId }).exec()

			if (!templateSearched) return null

			return this.fromModelToEntity(templateSearched.toObject())
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error searching the template15")
		}
	}

	update = async (storeId: number, template15: Template15Entity) => {
		try {
			const newSettings = Object.assign(template15, {})

			const templateUpdated = await this.template15Model.updateOne({ storeId }, newSettings).exec()

			return templateUpdated.modifiedCount > 0
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error updating the template15")
		}
	}

	update2 = async (_id: ObjectId, template15: Template15Entity) => {
		try {
			const newSettings = Object.assign(template15, {})

			const templateUpdated = await this.template15Model.updateOne({ _id }, newSettings).exec()

			return templateUpdated.modifiedCount > 0
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error updating the template15")
		}
	}

	remove = async (storeId: number) => {
		try {
			const isDeleted = await this.template15Model.deleteOne({ storeId }).exec()
			return isDeleted.deletedCount > 0
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error deleting the template15")
		}
	}

	fromModelToEntity = (template15: Template15Model) => {
		return plainToClass(Template15Entity, template15)
	}
}
