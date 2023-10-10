import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { CarritosProductosWhatsapp } from "./CarritosProductosWhatsapp"
import { Tiendas } from "./Tiendas"
import { Users } from "./Users"

@Index("carritos_whatsapp_tiendas_id_foreign", ["tiendasId"], {})
@Index("carritos_whatsapp_users_id_foreign", ["usersId"], {})
@Entity("carritos_whatsapp", { schema: "komercia_prod" })
export class CarritosWhatsapp {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("text", { name: "comentario", nullable: true })
	comentario: string | null

	@Column("varchar", { name: "metodo_pago", length: 255 })
	metodoPago: string

	@Column("varchar", { name: "metodo_envio", length: 255 })
	metodoEnvio: string

	@Column("varchar", { name: "direccion_entrega", length: 255 })
	direccionEntrega: string

	@Column("text", { name: "url_checkout" })
	urlCheckout: string

	@Column("varchar", { name: "estado", length: 255 })
	estado: string

	@Column("varchar", { name: "numero_orden", length: 255 })
	numeroOrden: string

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("int", { name: "users_id", unsigned: true })
	usersId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@OneToMany(
		() => CarritosProductosWhatsapp,
		(carritosProductosWhatsapp) => carritosProductosWhatsapp.carritosWhatsapp
	)
	carritosProductosWhatsapps: CarritosProductosWhatsapp[]

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.carritosWhatsapps, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas

	@ManyToOne(() => Users, (users) => users.carritosWhatsapps, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "users_id", referencedColumnName: "id" }])
	users: Users
}
