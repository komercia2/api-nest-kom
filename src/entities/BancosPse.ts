import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("bancos_pse", { schema: "komercia_prod" })
export class BancosPse {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "nombre", length: 255 })
	nombre: string

	@Column("int", { name: "code" })
	code: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null
}
