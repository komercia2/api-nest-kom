import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { MultipleSubscriptionCouponToStore } from "./MultipleSubscriptionCouponToStore"

@Entity({ name: "multiple_subscription_coupon" })
export class MultipleSubscriptionCoupon {
	@PrimaryGeneratedColumn({ type: "int", unsigned: true })
	id: number

	@Column({ type: "varchar", length: 45, unique: true })
	@Index({ unique: true })
	coupon: string

	@Column({ type: "int", unsigned: true, default: 0 })
	amount: number

	@Column({ type: "int", unsigned: true })
	plan: number

	@Column({ type: "int", unsigned: true })
	validMonths: number

	@Column({ type: "tinyint", unsigned: true })
	available: number

	@OneToMany(
		() => MultipleSubscriptionCouponToStore,
		(multipleSubscriptionCouponToStore) => multipleSubscriptionCouponToStore.coupon
	)
	multipleSubscriptionCouponsToStore: MultipleSubscriptionCouponToStore[]
}
