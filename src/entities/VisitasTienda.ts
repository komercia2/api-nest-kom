import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("visitas_tienda", { schema: "komercia_prod" })
export class VisitasTienda {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number

	@Column("int", { name: "numero_visitas" })
	numeroVisitas: number

	@Column("int", { name: "tienda_id" })
	tiendaId: number

	@Column("datetime", { name: "created_at" })
	createdAt: Date

	@Column("datetime", { name: "updated_at" })
	updatedAt: Date
}
