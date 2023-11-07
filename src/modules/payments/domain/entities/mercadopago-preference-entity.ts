interface IMercadopagoPreferenceEntity {
	preferenceId: string
	publicId: string
}

export class MercadopagoPreferenceEntity implements IMercadopagoPreferenceEntity {
	public preferenceId: string
	public publicId: string

	constructor(data: IMercadopagoPreferenceEntity) {
		this.preferenceId = data.preferenceId
		this.publicId = data.publicId
	}
}
