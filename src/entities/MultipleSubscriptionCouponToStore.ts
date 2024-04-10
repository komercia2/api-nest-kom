import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { MultipleSubscriptionCoupon } from "./MultipleSubscriptionCoupon"
import { Tiendas } from "./Tiendas"

@Entity()
export class MultipleSubscriptionCouponToStore {
	@PrimaryGeneratedColumn({ type: "int", unsigned: true })
	id: number

	@Column({ type: "int", unsigned: true })
	storeId: number

	@Column({ type: "datetime" })
	redimed_at: Date

	@Column({ type: "int", unsigned: true })
	couponId: number

	@ManyToOne(() => Tiendas, (store) => store.multipleSubscriptionCouponsToStore, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE"
	})
	@JoinColumn({ name: "storeId" })
	store: Tiendas

	@ManyToOne(
		() => MultipleSubscriptionCoupon,
		(coupon) => coupon.multipleSubscriptionCouponsToStore,
		{ onDelete: "NO ACTION", onUpdate: "NO ACTION" }
	)
	@JoinColumn({ name: "couponId" })
	coupon: MultipleSubscriptionCoupon
}
