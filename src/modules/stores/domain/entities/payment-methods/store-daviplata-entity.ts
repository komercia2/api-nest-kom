export class StoreDaviplataEntity {
	constructor(
		readonly id: number,
		readonly referencia: string,
		readonly comentario: string,
		readonly id_tienda: number,
		readonly created_at: Date,
		readonly updated_at: Date
	) {
		this.id = id
		this.referencia = referencia
		this.comentario = comentario
		this.id_tienda = id_tienda
		this.created_at = created_at
		this.updated_at = updated_at
	}
}
