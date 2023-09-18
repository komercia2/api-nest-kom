import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ collection: "existing_subdomains" })
export class ExistingSubdomainModel {
	@Prop({ required: true, type: String })
	subdominio: string
}

export const ExistingSubdomainSchema = SchemaFactory.createForClass(ExistingSubdomainModel)
