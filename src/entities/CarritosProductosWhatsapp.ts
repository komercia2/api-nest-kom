import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { CarritosWhatsapp } from "./CarritosWhatsapp"
import { Productos } from "./Productos"

@Index("carritos_productos_whatsapp_productos_id_foreign", ["productosId"], {})
@Index("carritos_productos_whatsapp_carritos_whatsapp_id_foreign", ["carritosWhatsappId"], {})
@Entity("carritos_productos_whatsapp", { schema: "komercia_prod" })
export class CarritosProductosWhatsapp {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("int", { name: "unidades" })
	unidades: number

	@Column("double", { name: "precio", precision: 14, scale: 2 })
	precio: number

	@Column("text", { name: "variantes", nullable: true })
	variantes: string | null

	@Column("int", { name: "productos_id", unsigned: true })
	productosId: number

	@Column("bigint", { name: "carritos_whatsapp_id", unsigned: true })
	carritosWhatsappId: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(
		() => CarritosWhatsapp,
		(carritosWhatsapp) => carritosWhatsapp.carritosProductosWhatsapps,
		{ onDelete: "CASCADE", onUpdate: "NO ACTION" }
	)
	@JoinColumn([{ name: "carritos_whatsapp_id", referencedColumnName: "id" }])
	carritosWhatsapp: CarritosWhatsapp

	@ManyToOne(() => Productos, (productos) => productos.carritosProductosWhatsapps, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "productos_id", referencedColumnName: "id" }])
	productos: Productos
}
