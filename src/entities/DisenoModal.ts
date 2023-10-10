import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("diseno_modal_tiendas_id_foreign", ["tiendasId"], {})
@Entity("diseno_modal", { schema: "komercia_prod" })
export class DisenoModal {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "title", length: 255 })
	title: string

	@Column("varchar", { name: "description", length: 255 })
	description: string

	@Column("varchar", { name: "img", length: 255 })
	img: string

	@Column("varchar", { name: "password", length: 255 })
	password: string

	@Column("varchar", { name: "colorTitle", length: 255 })
	colorTitle: string

	@Column("varchar", { name: "colorDescription", length: 255 })
	colorDescription: string

	@Column("varchar", { name: "fontWeighTitle", length: 255 })
	fontWeighTitle: string

	@Column("varchar", { name: "fontSizeTitle", length: 255 })
	fontSizeTitle: string

	@Column("varchar", { name: "fontWeighDescription", length: 255 })
	fontWeighDescription: string

	@Column("varchar", { name: "fontSizeDescription", length: 255 })
	fontSizeDescription: string

	@Column("varchar", { name: "width_img", length: 255 })
	widthImg: string

	@Column("varchar", { name: "colorTextBtn", length: 255 })
	colorTextBtn: string

	@Column("varchar", { name: "colorBgBtn", length: 255 })
	colorBgBtn: string

	@Column("varchar", { name: "colorBorder", length: 255 })
	colorBorder: string

	@Column("varchar", { name: "colorBg_1", length: 255 })
	colorBg_1: string

	@Column("varchar", { name: "colorBg_2", length: 255 })
	colorBg_2: string

	@Column("tinyint", { name: "stateModal", width: 1 })
	stateModal: boolean

	@Column("varchar", { name: "marginBottomImg", length: 255 })
	marginBottomImg: string

	@Column("varchar", { name: "marginBottomDescription", length: 255 })
	marginBottomDescription: string

	@Column("varchar", { name: "marginBottomTitle", length: 255 })
	marginBottomTitle: string

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.disenoModals, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
