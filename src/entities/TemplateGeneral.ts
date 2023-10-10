import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { TemplateGeneralNotificaciones } from "./TemplateGeneralNotificaciones"
import { TemplateGeneralPopup } from "./TemplateGeneralPopup"
import { Tiendas } from "./Tiendas"

@Index("template_general_tiendas_id_foreign", ["tiendasId"], {})
@Entity("template_general", { schema: "komercia_prod" })
export class TemplateGeneral {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("tinyint", {
		name: "showNotification",
		width: 1,
		default: () => "'0'"
	})
	showNotification: boolean

	@Column("tinyint", { name: "showWarehouses", width: 1, default: () => "'0'" })
	showWarehouses: boolean

	@Column("tinyint", { name: "showPopUp", width: 1, default: () => "'0'" })
	showPopUp: boolean

	@Column("varchar", { name: "favicon", nullable: true, length: 255 })
	favicon: string | null

	@Column("varchar", { name: "font", nullable: true, length: 255 })
	font: string | null

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.templateGenerals, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas

	@OneToMany(
		() => TemplateGeneralNotificaciones,
		(templateGeneralNotificaciones) => templateGeneralNotificaciones.templateGeneral
	)
	templateGeneralNotificaciones: TemplateGeneralNotificaciones[]

	@OneToMany(
		() => TemplateGeneralPopup,
		(templateGeneralPopup) => templateGeneralPopup.templateGeneral
	)
	templateGeneralPopups: TemplateGeneralPopup[]
}
