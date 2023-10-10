import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("tareas", { schema: "komercia_prod" })
export class Tareas {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "title", length: 255 })
	title: string

	@Column("varchar", { name: "link", length: 255 })
	link: string

	@Column("varchar", { name: "description", length: 255 })
	description: string

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
}
