export class StoreFlowEntity {
	constructor(readonly estado: boolean, readonly api_key: string, readonly secret_key: string) {
		this.estado = estado
		this.api_key = api_key
		this.secret_key = secret_key
	}
}
