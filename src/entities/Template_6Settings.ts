import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Template_6 } from "./Template_6"

@Index("template_6_settings_template_6_id_foreign", ["template_6Id"], {})
@Entity("template_6_settings", { schema: "komercia_prod" })
export class Template_6Settings {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "background_color_1", length: 255 })
	backgroundColor_1: string

	@Column("varchar", { name: "background_color_2", length: 255 })
	backgroundColor_2: string

	@Column("varchar", { name: "background_header_footer", length: 255 })
	backgroundHeaderFooter: string

	@Column("varchar", { name: "color_text_header_footer", length: 255 })
	colorTextHeaderFooter: string

	@Column("varchar", { name: "color_subtext_header_footer", length: 255 })
	colorSubtextHeaderFooter: string

	@Column("varchar", { name: "color_text", length: 255 })
	colorText: string

	@Column("varchar", { name: "color_subtext", length: 255 })
	colorSubtext: string

	@Column("varchar", { name: "color_icon", length: 255 })
	colorIcon: string

	@Column("varchar", { name: "color_shopping_cart", length: 255 })
	colorShoppingCart: string

	@Column("varchar", { name: "color_text_btn", length: 255 })
	colorTextBtn: string

	@Column("varchar", { name: "color_background_btn", length: 255 })
	colorBackgroundBtn: string

	@Column("varchar", { name: "color_border", length: 255 })
	colorBorder: string

	@Column("varchar", { name: "logo_width", length: 255 })
	logoWidth: string

	@Column("varchar", { name: "radius_btn", length: 255 })
	radiusBtn: string

	@Column("bigint", { name: "template_6_id", unsigned: true })
	template_6Id: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Template_6, (template_6) => template_6.template_6Settings, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "template_6_id", referencedColumnName: "id" }])
	template_6: Template_6
}
