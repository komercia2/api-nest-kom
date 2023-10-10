import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm"

@Index("tienda_id", ["tiendaId"], {})
@Entity("mensajes_contacto", { schema: "komercia_prod" })
export class MensajesContacto {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number

	@Column("longtext", { name: "mensaje" })
	mensaje: string

	@Column("varchar", { name: "nombre", length: 255 })
	nombre: string

	@Column("varchar", { name: "telefono", length: 255 })
	telefono: string

	@Column("varchar", { name: "email", length: 255 })
	email: string

	@Column("int", { name: "tienda_id" })
	tiendaId: number

	@Column("int", { name: "usuario_id", nullable: true })
	usuarioId: number | null

	@Column("datetime", { name: "created_at" })
	createdAt: Date

	@Column("datetime", { name: "updated_at" })
	updatedAt: Date
}
