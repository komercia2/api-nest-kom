export class BankConsignmmentEntity {
	constructor(
		readonly id: number,
		readonly tipo: number,
		readonly numero_cuenta: string,
		readonly tienda_id: number,
		readonly created_at: Date,
		readonly updated_at: Date,
		readonly bancos_id: number,
		readonly tipo_identificacion: string,
		readonly identificacion: string,
		readonly comentario: string
	) {
		this.id = id
		this.tipo = tipo
		this.numero_cuenta = numero_cuenta
		this.tienda_id = tienda_id
		this.created_at = created_at
		this.updated_at = updated_at
		this.bancos_id = bancos_id
		this.tipo_identificacion = tipo_identificacion
		this.identificacion = identificacion
		this.comentario = comentario
	}
}
