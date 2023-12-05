interface IMercadopagoPreferenceEntity {
	readonly preferenceId: string
	readonly init_point: string
	readonly sandbox_init_point: string
}

export class MercadopagoPreferenceEntity implements IMercadopagoPreferenceEntity {
	readonly preferenceId: string
	readonly init_point: string
	readonly sandbox_init_point: string

	constructor(data: IMercadopagoPreferenceEntity) {
		this.preferenceId = data.preferenceId
		this.init_point = data.init_point
		this.sandbox_init_point = data.sandbox_init_point
	}
}
