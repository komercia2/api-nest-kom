import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("partners", { schema: "komercia_prod" })
export class Partners {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "name", length: 255 })
	name: string

	@Column("varchar", { name: "location", length: 255 })
	location: string

	@Column("varchar", { name: "tags", nullable: true, length: 255 })
	tags: string | null

	@Column("varchar", { name: "url", nullable: true, length: 255 })
	url: string | null

	@Column("varchar", { name: "logo", length: 255 })
	logo: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("int", { name: "precio", nullable: true })
	precio: number | null

	@Column("varchar", { name: "descripcion", nullable: true, length: 255 })
	descripcion: string | null
}
