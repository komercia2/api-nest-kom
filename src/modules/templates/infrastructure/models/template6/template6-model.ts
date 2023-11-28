import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ObjectId } from "mongoose"

import { Template6BannerModel } from "./banner"
import { Template6FooterModel } from "./footer"
import { Template6HeaderModel } from "./header"
import { Template6InformationModel } from "./information"
import { Template6InformationLogosModel } from "./information-logos"
import { Template6ProductOverviewsModel } from "./product-overviews"
import { Template6ProductsFeatureModel } from "./products-features"
import { Template6SettingsGeneralModel } from "./settings-general"

@Schema({ collection: "template6" })
export class Template6Model {
	_id: ObjectId

	@Prop({ required: true, type: Template6HeaderModel, ref: Template6HeaderModel.name })
	header: Template6HeaderModel

	@Prop({
		required: true,
		type: Template6SettingsGeneralModel,
		ref: Template6SettingsGeneralModel.name
	})
	settingsGeneral: Template6SettingsGeneralModel

	@Prop({
		required: true,
		type: Template6BannerModel,
		ref: Template6BannerModel.name
	})
	banner: Template6BannerModel

	@Prop({
		required: true,
		type: Template6ProductsFeatureModel,
		ref: Template6ProductsFeatureModel.name
	})
	productFeatures: Template6ProductsFeatureModel

	@Prop({
		required: true,
		type: Template6ProductOverviewsModel,
		ref: Template6ProductOverviewsModel.name
	})
	productOverviews: Template6ProductOverviewsModel

	@Prop({
		required: true,
		type: Template6InformationModel,
		ref: Template6InformationModel.name
	})
	information: Template6InformationModel

	@Prop({
		required: true,
		type: Template6InformationLogosModel,
		ref: Template6InformationLogosModel.name
	})
	informationLogos: Template6InformationLogosModel

	@Prop({ required: true, type: Template6FooterModel, ref: Template6FooterModel.name })
	footer: Template6FooterModel
}

export const Template6Schema = SchemaFactory.createForClass(Template6Model)
