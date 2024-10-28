import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { InjectRepository } from "@nestjs/typeorm"
import { DatabaseTransactionErrorException } from "@shared/infrastructure/exceptions"
import { WapiTemplateEntity } from "@templates/domain/entities/wapi"
import { WebSiteTemplate } from "@templates/domain/entities/websites/webSiteTemplate"
import { Model } from "mongoose"
import { TemplateWhatsappSettings } from "src/entities"
import { ObjectId } from "typeorm"
import { Repository } from "typeorm"

import { WapiModel } from "../models/wapi"

@Injectable()
export class WapiTemplateMongooseService {
	constructor(
		@InjectModel(WapiModel.name) private readonly wapiModel: Model<WapiModel>,

		@InjectRepository(TemplateWhatsappSettings)
		private readonly template99Repository: Repository<TemplateWhatsappSettings>
	) {}

	create2 = async (templateNumber?: number, demoId?: number | string) => {
		try {
			let defaultSettings: Partial<TemplateWhatsappSettings> = {}

			if (templateNumber && demoId && typeof demoId === "number") {
				const templateSearched = await this.template99Repository.findOne({
					where: { tiendasId: +demoId }
				})

				if (!templateSearched) throw new DatabaseTransactionErrorException("Template not found")

				defaultSettings = templateSearched
			}

			if (!demoId) throw new DatabaseTransactionErrorException("DemoId is required")

			const settings = Object.assign(defaultSettings, {})

			const { id: _, ...rest } = settings

			const templateWapiCreated = await new this.wapiModel({
				banner: rest.banner,
				descripcion: rest.descripcion,
				logo_cuadrado: rest.logoCuadrado,
				color_primario: rest.colorPrimario,
				color_secundario: rest.colorSecundario,
				color_icon: rest.colorIcon,
				tema: rest.tema,
				pago_online: rest.pagoOnline,
				mensaje_principal: rest.mensajePrincipal,
				estilo_productos: rest.estiloProductos,
				estilo_categorias: rest.estiloCategorias,
				watermark: rest.watermark,
				state_subcategorias: rest.stateSubcategorias
			}).save()

			return templateWapiCreated.toObject()
		} catch (error) {
			console.log(error)
			throw new DatabaseTransactionErrorException("Has been an error creating the template15")
		}
	}

	update2 = async (_id: ObjectId, templateWapi: WebSiteTemplate) => {
		try {
			const newSettings = Object.assign(templateWapi, {})

			const templateUpdated = await this.wapiModel.updateOne({ _id }, newSettings).exec()

			return templateUpdated.modifiedCount > 0
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error updating the template6")
		}
	}

	find = async (documentId: string) => {
		try {
			const templateSearched = await this.wapiModel.findOne({ _id: documentId }).exec()

			if (!templateSearched) return null

			return this.fromModelToEntity(templateSearched.toObject())
		} catch (error) {
			throw new DatabaseTransactionErrorException("Has been an error getting the template6")
		}
	}

	async remove2(_id: ObjectId) {
		try {
			const isDeleted = await this.wapiModel.deleteOne({ _id }).exec()

			return { deleted: isDeleted.deletedCount > 0, count: isDeleted.deletedCount }
		} catch (error) {
			console.log(error)
			throw new DatabaseTransactionErrorException("Has been an error deleting the template6")
		}
	}

	fromModelToEntity = (templateWapi: WapiModel) => {
		return new WapiTemplateEntity({ ...templateWapi, _id: templateWapi._id.toString() })
	}
}
