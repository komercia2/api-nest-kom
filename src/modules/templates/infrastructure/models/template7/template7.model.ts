import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ObjectId } from "mongoose"

@Schema({ collection: "template7" })
export class Template7Model {
	_id: ObjectId

	@Prop({ type: Object, required: false })
	header: Record<string, object>

	@Prop({ type: Object, required: false })
	banner: Record<string, object>

	@Prop({ type: Object, required: false })
	content: Record<string, object>

	@Prop({ type: Object, required: false })
	productList: Record<string, object>

	@Prop({ type: Object, required: false })
	card: Record<string, object>

	@Prop({ type: Object, required: false })
	advertising: Record<string, object>

	@Prop({ type: Object, required: false })
	ProductFavorite: Record<string, object>

	@Prop({ type: Object, required: false })
	howWork: Record<string, object>

	@Prop({ type: Object, required: false })
	blog: Record<string, object>

	@Prop({ type: Object, required: false })
	newsletter: Record<string, object>

	@Prop({ type: Object, required: false })
	contentImg: Record<string, object>

	@Prop({ type: Object, required: false })
	footer: Record<string, object>

	@Prop({ type: Object, required: false })
	productListFilter: Record<string, object>

	@Prop({ type: Object, required: false })
	contact: Record<string, object>

	@Prop({ type: Object, required: false })
	detailsProduct: Record<string, object>

	@Prop({ type: Object, required: false })
	card1: Record<string, object>

	@Prop({ type: Object, required: false })
	blog1: Record<string, object>

	@Prop({ type: Object, required: false })
	settingGeneral: Record<string, object>
}

export const Template7Schema = SchemaFactory.createForClass(Template7Model)
