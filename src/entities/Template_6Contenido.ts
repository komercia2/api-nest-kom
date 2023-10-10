import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Template_6 } from "./Template_6"

@Index("template_6_contenido_template_6_id_foreign", ["template_6Id"], {})
@Entity("template_6_contenido", { schema: "komercia_prod" })
export class Template_6Contenido {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "title_1", length: 255 })
	title_1: string

	@Column("varchar", { name: "photo", length: 255 })
	photo: string

	@Column("varchar", { name: "description", length: 255 })
	description: string

	@Column("varchar", { name: "redirect_url", nullable: true, length: 255 })
	redirectUrl: string | null

	@Column("varchar", { name: "button_text", nullable: true, length: 255 })
	buttonText: string | null

	@Column("bigint", { name: "template_6_id", unsigned: true })
	template_6Id: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Template_6, (template_6) => template_6.template_6Contenidos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "template_6_id", referencedColumnName: "id" }])
	template_6: Template_6
}
