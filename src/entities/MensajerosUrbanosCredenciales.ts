import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("mensajeros_urbanos_credenciales_tiendas_id_foreign", ["tiendasId"], {})
@Entity("mensajeros_urbanos_credenciales", { schema: "komercia_prod" })
export class MensajerosUrbanosCredenciales {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("tinyint", { name: "sandbox", width: 1 })
	sandbox: boolean

	@Column("varchar", { name: "client_id", nullable: true, length: 255 })
	clientId: string | null

	@Column("varchar", { name: "client_secret", nullable: true, length: 255 })
	clientSecret: string | null

	@Column("varchar", { name: "user_id", nullable: true, length: 255 })
	userId: string | null

	@Column("varchar", { name: "company_id", nullable: true, length: 255 })
	companyId: string | null

	@Column("int", { name: "tiendas_id", nullable: true, unsigned: true })
	tiendasId: number | null

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.mensajerosUrbanosCredenciales, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
