import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Template_6 } from "./Template_6"

@Index("template_6_banners_template_6_id_foreign", ["template_6Id"], {})
@Entity("template_6_banners", { schema: "komercia_prod" })
export class Template_6Banners {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "urlRedirect", nullable: true, length: 255 })
	urlRedirect: string | null

	@Column("tinyint", {
		name: "ventana_emergente",
		width: 1,
		default: () => "'0'"
	})
	ventanaEmergente: boolean

	@Column("varchar", { name: "image_desktop", length: 255 })
	imageDesktop: string

	@Column("varchar", { name: "image_mobile", nullable: true, length: 255 })
	imageMobile: string | null

	@Column("bigint", { name: "template_6_id", unsigned: true })
	template_6Id: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Template_6, (template_6) => template_6.template_6Banners, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "template_6_id", referencedColumnName: "id" }])
	template_6: Template_6
}
