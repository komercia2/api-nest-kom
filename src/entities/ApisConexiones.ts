import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("apis_conexiones_tienda_id_foreign", ["tiendaId"], {})
@Entity("apis_conexiones", { schema: "komercia_prod" })
export class ApisConexiones {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("text", { name: "facebook", nullable: true })
	facebook: string | null

	@Column("text", { name: "analytics", nullable: true })
	analytics: string | null

	@Column("text", { name: "mercadolibre", nullable: true })
	mercadolibre: string | null

	@Column("int", { name: "tienda_id", unsigned: true })
	tiendaId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("text", { name: "tag_manager", nullable: true })
	tagManager: string | null

	@Column("varchar", { name: "tidio_user", nullable: true, length: 255 })
	tidioUser: string | null

	@Column("varchar", { name: "pixel_facebook", nullable: true, length: 255 })
	pixelFacebook: string | null

	@Column("varchar", {
		name: "facebook_pixel_metatag_1",
		nullable: true,
		length: 255
	})
	facebookPixelMetatag_1: string | null

	@Column("varchar", { name: "facebook_chat", nullable: true, length: 255 })
	facebookChat: string | null

	@Column("varchar", { name: "google_merchant", nullable: true, length: 255 })
	googleMerchant: string | null

	@Column("varchar", { name: "addi_ally_slug", nullable: true, length: 255 })
	addiAllySlug: string | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.apisConexiones, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda_id", referencedColumnName: "id" }])
	tienda: Tiendas
}
