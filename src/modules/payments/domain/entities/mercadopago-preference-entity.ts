interface IMercadopagoPreferenceEntity {
	preferenceId: string
	init_point: string
}

export class MercadopagoPreferenceEntity implements IMercadopagoPreferenceEntity {
	public preferenceId: string
	public init_point: string

	constructor(data: IMercadopagoPreferenceEntity) {
		this.preferenceId = data.preferenceId
		this.init_point = data.init_point
	}
}
