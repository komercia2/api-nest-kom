import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("visita_producto", { schema: "komercia_prod" })
export class VisitaProducto {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number

	@Column("int", { name: "numero_visitas" })
	numeroVisitas: number

	@Column("int", { name: "producto_id" })
	productoId: number

	@Column("datetime", { name: "created_at" })
	createdAt: Date

	@Column("datetime", { name: "updated_at" })
	updatedAt: Date
}
