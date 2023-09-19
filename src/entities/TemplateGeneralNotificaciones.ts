import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { TemplateGeneral } from "./TemplateGeneral"

@Index("template_general_notificaciones_template_general_id_foreign", ["templateGeneralId"], {})
@Entity("template_general_notificaciones", { schema: "komercia_prod" })
export class TemplateGeneralNotificaciones {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "texto", nullable: true, length: 255 })
	texto: string | null

	@Column("varchar", { name: "colorFondo", nullable: true, length: 255 })
	colorFondo: string | null

	@Column("varchar", { name: "colorTexto", nullable: true, length: 255 })
	colorTexto: string | null

	@Column("varchar", { name: "urlRedirect", nullable: true, length: 255 })
	urlRedirect: string | null

	@Column("bigint", { name: "template_general_id", unsigned: true })
	templateGeneralId: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(
		() => TemplateGeneral,
		(templateGeneral) => templateGeneral.templateGeneralNotificaciones,
		{ onDelete: "CASCADE", onUpdate: "NO ACTION" }
	)
	@JoinColumn([{ name: "template_general_id", referencedColumnName: "id" }])
	templateGeneral: TemplateGeneral
}
