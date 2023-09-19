import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("reputacion_tienda_marketplace_tienda_id_foreign", ["tiendaId"], {})
@Entity("reputacion_tienda_marketplace", { schema: "komercia_prod" })
export class ReputacionTiendaMarketplace {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("int", { name: "calidad_fotos", nullable: true })
	calidadFotos: number | null

	@Column("int", { name: "informacion_ubicacion", nullable: true })
	informacionUbicacion: number | null

	@Column("int", { name: "logo", nullable: true })
	logo: number | null

	@Column("int", { name: "descripcion", nullable: true })
	descripcion: number | null

	@Column("int", { name: "plan", nullable: true })
	plan: number | null

	@Column("int", { name: "dominio", nullable: true })
	dominio: number | null

	@Column("int", { name: "productos", nullable: true })
	productos: number | null

	@Column("int", { name: "categorias", nullable: true })
	categorias: number | null

	@Column("int", { name: "cantidad_productos", nullable: true })
	cantidadProductos: number | null

	@Column("int", { name: "calidad_banner", nullable: true })
	calidadBanner: number | null

	@Column("int", { name: "tienda_fisica", nullable: true })
	tiendaFisica: number | null

	@Column("int", { name: "visitas", nullable: true })
	visitas: number | null

	@Column("int", { name: "pasarela", nullable: true })
	pasarela: number | null

	@Column("int", { name: "ventas", nullable: true })
	ventas: number | null

	@Column("int", { name: "antiguedad", nullable: true })
	antiguedad: number | null

	@Column("int", { name: "tienda_id", unsigned: true })
	tiendaId: number

	@Column("timestamp", {
		name: "created_at",
		default: () => "'0000-00-00 00:00:00'"
	})
	createdAt: Date

	@Column("timestamp", {
		name: "updated_at",
		default: () => "'0000-00-00 00:00:00'"
	})
	updatedAt: Date

	@Column("int", { name: "ssl", nullable: true })
	ssl: number | null

	@Column("double", { name: "total_reputacion", precision: 8, scale: 2 })
	totalReputacion: number

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.reputacionTiendaMarketplaces, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda_id", referencedColumnName: "id" }])
	tienda: Tiendas
}
