import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Transform } from "class-transformer"
import { ObjectId, Types } from "mongoose"

import { Template15Model } from "../template15"

@Schema({ collection: "websites" })
export class WebSiteModel {
	@Transform(({ value }) => value.toString())
	_id: ObjectId

	@Prop({ required: true, type: Number })
	storeId: number

	@Prop({ required: true, type: String, unique: true })
	subdomain: string

	@Prop({ required: true, type: Number })
	templateNumber: number

	@Prop({ required: false, type: String, unique: true })
	domain: string

	@Prop({ required: true, type: Boolean })
	isMain: boolean

	@Prop({ required: true, type: Boolean })
	active: boolean

	@Prop({ required: false, type: Date })
	createdAt: Date

	@Prop({ required: false, type: Date })
	updatedAt: Date | null

	@Prop({ required: false, type: Date })
	deletedAt: Date | null

	@Prop({ required: false, type: Types.ObjectId, ref: Template15Model.name })
	templateId: Types.ObjectId
}

export const WebsitesSchema = SchemaFactory.createForClass(WebSiteModel)
