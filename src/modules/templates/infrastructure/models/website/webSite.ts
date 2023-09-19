import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ObjectId, Types } from "mongoose"

import { Template15Model } from "../template15"

@Schema({ collection: "websites" })
export class WebSiteModel {
	_id: ObjectId

	@Prop({ required: true, type: Number })
	storeId: number

	@Prop({ type: String, unique: true, sparse: true, default: null, trim: true })
	subdomain: string | null

	@Prop({ required: true, type: Number })
	templateNumber: number

	@Prop({ type: String, unique: true, sparse: true, default: null, trim: true })
	domain: string | null

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

	@Prop({ type: Types.ObjectId, ref: Template15Model.name })
	templateId: Template15Model
}

export const WebsitesSchema = SchemaFactory.createForClass(WebSiteModel)
