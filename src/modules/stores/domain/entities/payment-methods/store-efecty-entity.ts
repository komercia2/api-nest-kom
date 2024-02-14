export class EfectyStoreEntity {
	constructor(
		readonly id: number,
		readonly nombre: string,
		readonly telefono: string,
		readonly tienda_id: number,
		readonly created_at: Date,
		readonly updated_at: Date,
		readonly comentario: string
	) {
		this.id = id
		this.nombre = nombre
		this.telefono = telefono
		this.tienda_id = tienda_id
		this.created_at = created_at
		this.updated_at = updated_at
		this.comentario = comentario
	}
}
