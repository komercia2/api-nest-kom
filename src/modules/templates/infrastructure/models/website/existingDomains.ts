import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ collection: "existing_domains" })
export class ExistingDomainModel {
	@Prop({ required: true, type: String })
	dominio: string
}

export const ExistingDomainSchema = SchemaFactory.createForClass(ExistingDomainModel)
