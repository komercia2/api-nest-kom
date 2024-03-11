export class StoreFlowEntity {
	constructor(readonly estado: boolean, readonly api_key: string, readonly secretKey: string) {
		this.estado = estado
		this.api_key = api_key
		this.secretKey = secretKey
	}
}
