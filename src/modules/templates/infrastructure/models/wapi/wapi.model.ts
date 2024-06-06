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
	logoCuadrado: boolean

	@Prop()
	colorPrimario: string

	@Prop()
	colorSecundario: string

	@Prop()
	colorIcon: string

	@Prop({ type: Number, default: null })
	tema: number

	@Prop({ type: Boolean, default: null })
	pagoOnline: boolean

	@Prop()
	mensajePrincipal: string

	@Prop({ type: Number, default: null })
	estiloProductos: number

	@Prop({ type: Number, default: null })
	estiloCategorias: number

	@Prop({ required: false })
	watermark: boolean

	@Prop({ required: false })
	stateSubcategorias: boolean
}

export const WapiSchema = SchemaFactory.createForClass(WapiModel)
