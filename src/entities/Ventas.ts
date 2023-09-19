import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("ventas", { schema: "komercia_prod" })
export class Ventas {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("date", { name: "fecha_transaccion" })
	fechaTransaccion: string

	@Column("varchar", { name: "estado", length: 255 })
	estado: string

	@Column("double", { name: "valor", precision: 14, scale: 2 })
	valor: number

	@Column("varchar", { name: "medio", length: 255 })
	medio: string

	@Column("timestamp", {
		name: "created_at",
		default: () => "'0000-00-00 00:00:00'"
	})
	createdAt: Date

	@Column("timestamp", {
		name: "updated_at",
		default: () => "'0000-00-00 00:00:00'"
	})
	updatedAt: Date

	@Column("varchar", { name: "nombre", nullable: true, length: 255 })
	nombre: string | null

	@Column("varchar", { name: "correo", nullable: true, length: 255 })
	correo: string | null

	@Column("varchar", { name: "telefono", nullable: true, length: 255 })
	telefono: string | null

	@Column("varchar", { name: "plan", length: 255 })
	plan: string

	@Column("varchar", { name: "cupon", nullable: true, length: 255 })
	cupon: string | null

	@Column("varchar", { name: "referido", nullable: true, length: 255 })
	referido: string | null

	@Column("varchar", { name: "id_tienda", nullable: true, length: 255 })
	idTienda: string | null

	@Column("varchar", { name: "id_usuario", nullable: true, length: 255 })
	idUsuario: string | null

	@Column("timestamp", { name: "deleted_at", nullable: true })
	deletedAt: Date | null

	@Column("varchar", { name: "ref_epayco", nullable: true, length: 255 })
	refEpayco: string | null
}
