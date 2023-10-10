import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("customer_access_code_tiendas_id_foreign", ["tiendasId"], {})
@Entity("customer_access_code", { schema: "komercia_prod" })
export class CustomerAccessCode {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "user_code", nullable: true, length: 255 })
	userCode: string | null

	@Column("varchar", { name: "user_name", length: 255 })
	userName: string

	@Column("varchar", { name: "user_email", nullable: true, length: 255 })
	userEmail: string | null

	@Column("varchar", { name: "access_code", length: 255 })
	accessCode: string

	@Column("tinyint", { name: "status", width: 1, default: () => "'0'" })
	status: boolean

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.customerAccessCodes, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
