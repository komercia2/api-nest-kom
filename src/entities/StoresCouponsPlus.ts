import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Productos } from "./Productos"
import { Tiendas } from "./Tiendas"
import { Users } from "./Users"

@Entity({ name: "stores_coupons_plus", database: "komercia_prod" })
@Index("indx_coupon", ["coupon"])
export class StoresCouponsPlus {
	@PrimaryGeneratedColumn({ type: "int", unsigned: true })
	id: number

	@Column({ type: "varchar", length: 64, nullable: false })
	coupon: string

	@Column({ type: "tinyint", nullable: false, default: 1 })
	status: number

	@Column({ type: "tinyint", nullable: false })
	type: number

	@Column({ type: "float", unsigned: true, nullable: true })
	percentage_value: number

	@Column({ type: "float", unsigned: true, nullable: true })
	fixed_price_value: number

	@Column({ type: "tinyint", nullable: false, default: 1 })
	public: number

	@Column({ type: "int", unsigned: true, nullable: true })
	claim_limit: number

	@Column({ type: "int", unsigned: true, nullable: true, default: 1 })
	claim_limit_per_client: number

	@Column({ type: "timestamp", nullable: true })
	expiration_date: Date | null

	@Column({ type: "int", unsigned: true })
	store_id: number

	@Column({ type: "timestamp", nullable: true })
	created_at: Date

	@Column({ type: "timestamp", nullable: true })
	updated_at: Date

	@Column({ type: "timestamp", nullable: true })
	deleted_at: Date

	@Column({ type: "int", unsigned: true, nullable: true })
	client_id: number

	@Column({ type: "timestamp", nullable: true })
	claimed_at: Date

	@ManyToOne(() => Tiendas, (tienda) => tienda.storesCouponsPlus, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE"
	})
	@JoinColumn({ name: "store_id" })
	store: Tiendas

	@ManyToOne(() => Productos, (producto) => producto.storesCouponsPlus, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn({ name: "product_id" })
	product: Productos

	@ManyToOne(() => Users, (user) => user.storesCouponsPlus, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn({ name: "client_id" })
	user: Users
}
