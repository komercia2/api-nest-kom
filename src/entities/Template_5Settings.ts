import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("template_5_settings_tiendas_id_foreign", ["tiendasId"], {})
@Entity("template_5_settings", { schema: "komercia_prod" })
export class Template_5Settings {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "banner", nullable: true, length: 255 })
	banner: string | null

	@Column("varchar", { name: "color_icon", nullable: true, length: 255 })
	colorIcon: string | null

	@Column("varchar", {
		name: "color_background_btn",
		nullable: true,
		length: 255
	})
	colorBackgroundBtn: string | null

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("varchar", {
		name: "background_color_1",
		nullable: true,
		length: 255
	})
	backgroundColor_1: string | null

	@Column("varchar", {
		name: "background_color_2",
		nullable: true,
		length: 255
	})
	backgroundColor_2: string | null

	@Column("varchar", { name: "banner_footer", nullable: true, length: 255 })
	bannerFooter: string | null

	@Column("varchar", { name: "tipo_letra", nullable: true, length: 255 })
	tipoLetra: string | null

	@Column("varchar", { name: "color_text", nullable: true, length: 255 })
	colorText: string | null

	@Column("varchar", { name: "color_subtext", nullable: true, length: 255 })
	colorSubtext: string | null

	@Column("varchar", { name: "color_text_btn", nullable: true, length: 255 })
	colorTextBtn: string | null

	@Column("text", { name: "iframe", nullable: true })
	iframe: string | null

	@Column("varchar", { name: "color_border", nullable: true, length: 255 })
	colorBorder: string | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.template_5Settings, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
