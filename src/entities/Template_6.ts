import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { Template_6Banners } from "./Template_6Banners"
import { Template_6Contenido } from "./Template_6Contenido"
import { Template_6Settings } from "./Template_6Settings"
import { Tiendas } from "./Tiendas"

@Index("template_6_tiendas_id_foreign", ["tiendasId"], {})
@Entity("template_6", { schema: "komercia_prod" })
export class Template_6 {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("int", { name: "header" })
	header: number

	@Column("int", { name: "footer" })
	footer: number

	@Column("tinyint", { name: "showNewsLetter", width: 1 })
	showNewsLetter: boolean

	@Column("tinyint", { name: "showVideo", width: 1 })
	showVideo: boolean

	@Column("int", { name: "grid" })
	grid: number

	@Column("int", { name: "banner" })
	banner: number

	@Column("varchar", { name: "video_title", nullable: true, length: 255 })
	videoTitle: string | null

	@Column("varchar", { name: "video_description", nullable: true, length: 255 })
	videoDescription: string | null

	@Column("varchar", { name: "video_url", nullable: true, length: 255 })
	videoUrl: string | null

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.templateS, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas

	@OneToMany(() => Template_6Banners, (template_6Banners) => template_6Banners.template_6)
	template_6Banners: Template_6Banners[]

	@OneToMany(() => Template_6Contenido, (template_6Contenido) => template_6Contenido.template_6)
	template_6Contenidos: Template_6Contenido[]

	@OneToMany(() => Template_6Settings, (template_6Settings) => template_6Settings.template_6)
	template_6Settings: Template_6Settings[]
}
