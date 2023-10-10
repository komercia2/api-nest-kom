import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { TemplateGeneral } from "./TemplateGeneral"

@Index("template_general_popup_template_general_id_foreign", ["templateGeneralId"], {})
@Entity("template_general_popup", { schema: "komercia_prod" })
export class TemplateGeneralPopup {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "imagen", nullable: true, length: 255 })
	imagen: string | null

	@Column("varchar", { name: "titulo", nullable: true, length: 255 })
	titulo: string | null

	@Column("varchar", { name: "descripcion", nullable: true, length: 255 })
	descripcion: string | null

	@Column("varchar", { name: "texto_boton", nullable: true, length: 255 })
	textoBoton: string | null

	@Column("varchar", { name: "redireccion", nullable: true, length: 255 })
	redireccion: string | null

	@Column("varchar", { name: "color_texto", nullable: true, length: 255 })
	colorTexto: string | null

	@Column("varchar", { name: "color_fondo", nullable: true, length: 255 })
	colorFondo: string | null

	@Column("varchar", { name: "color_boton", nullable: true, length: 255 })
	colorBoton: string | null

	@Column("varchar", { name: "color_texto_boton", nullable: true, length: 255 })
	colorTextoBoton: string | null

	@Column("bigint", { name: "template_general_id", unsigned: true })
	templateGeneralId: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => TemplateGeneral, (templateGeneral) => templateGeneral.templateGeneralPopups, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "template_general_id", referencedColumnName: "id" }])
	templateGeneral: TemplateGeneral
}
