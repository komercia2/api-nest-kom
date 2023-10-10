import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("template_whatsapp_settings_tiendas_id_foreign", ["tiendasId"], {})
@Entity("template_whatsapp_settings", { schema: "komercia_prod" })
export class TemplateWhatsappSettings {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "banner", nullable: true, length: 255 })
	banner: string | null

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("longtext", { name: "descripcion", nullable: true })
	descripcion: string | null

	@Column("tinyint", {
		name: "logo_cuadrado",
		nullable: true,
		width: 1,
		default: () => "'1'"
	})
	logoCuadrado: boolean | null

	@Column("varchar", { name: "color_primario", nullable: true, length: 255 })
	colorPrimario: string | null

	@Column("varchar", { name: "color_secundario", nullable: true, length: 255 })
	colorSecundario: string | null

	@Column("varchar", { name: "color_icon", nullable: true, length: 255 })
	colorIcon: string | null

	@Column("int", { name: "tema", nullable: true, default: () => "'1'" })
	tema: number | null

	@Column("tinyint", {
		name: "pago_online",
		nullable: true,
		width: 1,
		default: () => "'0'"
	})
	pagoOnline: boolean | null

	@Column("longtext", { name: "mensaje_principal", nullable: true })
	mensajePrincipal: string | null

	@Column("int", {
		name: "estilo_productos",
		nullable: true,
		default: () => "'1'"
	})
	estiloProductos: number | null

	@Column("int", {
		name: "estilo_categorias",
		nullable: true,
		default: () => "'1'"
	})
	estiloCategorias: number | null

	@Column("tinyint", { name: "watermark", width: 1, default: () => "'0'" })
	watermark: boolean

	@Column("tinyint", {
		name: "state_subcategorias",
		width: 1,
		default: () => "'1'"
	})
	stateSubcategorias: boolean

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.templateWhatsappSettings, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
