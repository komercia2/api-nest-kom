export class CashOnDelivery {
	constructor(
		readonly id: number,
		readonly valores: string,
		readonly id_tienda: number,
		readonly created_at: Date,
		readonly updated_at: Date,
		readonly comentario: string
	) {
		this.id = id
		this.valores = valores
		this.id_tienda = id_tienda
		this.created_at = created_at
		this.updated_at = updated_at
		this.comentario = comentario
	}
}
