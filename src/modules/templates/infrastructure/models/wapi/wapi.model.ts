import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ObjectId } from "mongoose"

@Schema({ collection: "wapi" })
export class WapiModel {
	_id: ObjectId

	@Prop()
	banner: string

	@Prop()
	descripcion: string

	@Prop({ type: Boolean, default: null })
	logo_cuadrado: boolean

	@Prop()
	color_primario: string

	@Prop()
	color_secundario: string

	@Prop()
	color_icon: string

	@Prop({ type: Number, default: null })
	tema: number

	@Prop({ type: Boolean, default: null })
	pago_online: boolean

	@Prop()
	mensaje_principal: string

	@Prop({ type: Number, default: null })
	estilo_productos: number

	@Prop({ type: Number, default: null })
	estilo_categorias: number

	@Prop({ required: false })
	watermark: boolean

	@Prop({ required: false })
	state_subcategorias: boolean
}

export const WapiSchema = SchemaFactory.createForClass(WapiModel)
