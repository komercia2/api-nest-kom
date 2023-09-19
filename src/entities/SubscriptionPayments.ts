import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Subscriptions } from "./Subscriptions"
import { Users } from "./Users"

@Index("subscription_payments_subscription_id_foreign", ["subscriptionId"], {})
@Index("subscription_payments_consultant_id_foreign", ["consultantId"], {})
@Index("subscription_payments_user_id_foreign", ["userId"], {})
@Index("subscription_payments_date_index", ["date"], {})
@Index("subscription_payments_plan_index", ["plan"], {})
@Index("subscription_payments_source_reference_index", ["source", "reference"], {})
@Entity("subscription_payments", { schema: "komercia_prod" })
export class SubscriptionPayments {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("date", { name: "date" })
	date: string

	@Column("int", { name: "plan" })
	plan: number

	@Column("date", { name: "period_start" })
	periodStart: string

	@Column("date", { name: "period_end" })
	periodEnd: string

	@Column("double", { name: "amount", precision: 22 })
	amount: number

	@Column("double", { name: "total", precision: 22 })
	total: number

	@Column("varchar", { name: "source", nullable: true, length: 255 })
	source: string | null

	@Column("varchar", { name: "reference", nullable: true, length: 255 })
	reference: string | null

	@Column("varchar", { name: "comment", nullable: true, length: 255 })
	comment: string | null

	@Column("bigint", { name: "subscription_id", unsigned: true })
	subscriptionId: string

	@Column("int", {
		name: "consultant_id",
		unsigned: true,
		default: () => "'0'"
	})
	consultantId: number

	@Column("int", { name: "user_id", unsigned: true, default: () => "'0'" })
	userId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Users, (users) => users.subscriptionPayments, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "consultant_id", referencedColumnName: "id" }])
	consultant: Users

	@ManyToOne(() => Subscriptions, (subscriptions) => subscriptions.subscriptionPayments, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "subscription_id", referencedColumnName: "id" }])
	subscription: Subscriptions

	@ManyToOne(() => Users, (users) => users.subscriptionPayments2, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
	user: Users
}
