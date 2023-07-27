export class ProductDescriptionSuggetionEntity {
	private descrptionSuggetion: string

	constructor(descrptionSuggetion: string) {
		this.descrptionSuggetion = descrptionSuggetion
	}

	getDescrptionSuggetion = () => this.descrptionSuggetion
}
