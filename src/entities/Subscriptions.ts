import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { SubscriptionGateways } from "./SubscriptionGateways"
import { SubscriptionPayments } from "./SubscriptionPayments"
import { Tiendas } from "./Tiendas"
import { Users } from "./Users"

@Index("subscriptions_subscription_gateway_id_foreign", ["subscriptionGatewayId"], {})
@Index("subscriptions_tienda_id_foreign", ["tiendaId"], {})
@Index("subscriptions_consultant_id_foreign", ["consultantId"], {})
@Index("subscriptions_user_id_foreign", ["userId"], {})
@Index("subscriptions_gateway_reference_id_index", ["gatewayReferenceId"], {})
@Index("subscriptions_current_plan_index", ["currentPlan"], {})
@Index("subscriptions_payment_status_index", ["paymentStatus"], {})
@Index("subscriptions_active_index", ["active"], {})
@Index("subscriptions_period_start_index", ["periodStart"], {})
@Index("subscriptions_period_end_index", ["periodEnd"], {})
@Entity("subscriptions", { schema: "komercia_prod" })
export class Subscriptions {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("int", { name: "tienda_id", unsigned: true })
	tiendaId: number

	@Column("bigint", { name: "subscription_gateway_id", unsigned: true })
	subscriptionGatewayId: string

	@Column("text", { name: "gateway_payment_url", nullable: true })
	gatewayPaymentUrl: string | null

	@Column("varchar", {
		name: "gateway_reference_id",
		nullable: true,
		length: 255
	})
	gatewayReferenceId: string | null

	@Column("int", { name: "current_plan" })
	currentPlan: number

	@Column("date", { name: "period_start" })
	periodStart: string

	@Column("date", { name: "period_last_renew" })
	periodLastRenew: string

	@Column("date", { name: "period_end" })
	periodEnd: string

	@Column("int", { name: "payment_status" })
	paymentStatus: number

	@Column("int", { name: "active" })
	active: number

	@Column("varchar", { name: "comment", nullable: true, length: 255 })
	comment: string | null

	@Column("int", {
		name: "consultant_id",
		unsigned: true,
		default: () => "'0'"
	})
	consultantId: number

	@Column("int", { name: "user_id", unsigned: true })
	userId: number

	@Column("tinyint", { name: "request_cancelation", nullable: true, width: 1 })
	requestCancelation: boolean | null

	@Column("datetime", { name: "request_cancelation_at", nullable: true })
	requestCancelationAt: Date | null

	@Column("varchar", {
		name: "cancelation_comment",
		nullable: true,
		length: 255
	})
	cancelationComment: string | null

	@Column("int", { name: "request_change_plan", nullable: true })
	requestChangePlan: number | null

	@Column("datetime", { name: "request_change_plan_at", nullable: true })
	requestChangePlanAt: Date | null

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@OneToMany(
		() => SubscriptionPayments,
		(subscriptionPayments) => subscriptionPayments.subscription
	)
	subscriptionPayments: SubscriptionPayments[]

	@ManyToOne(() => Users, (users) => users.subscriptions, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "consultant_id", referencedColumnName: "id" }])
	consultant: Users

	@ManyToOne(
		() => SubscriptionGateways,
		(subscriptionGateways) => subscriptionGateways.subscriptions,
		{ onDelete: "NO ACTION", onUpdate: "NO ACTION" }
	)
	@JoinColumn([{ name: "subscription_gateway_id", referencedColumnName: "id" }])
	subscriptionGateway: SubscriptionGateways

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.subscriptions, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda_id", referencedColumnName: "id" }])
	tienda: Tiendas

	@ManyToOne(() => Users, (users) => users.subscriptions2, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
	user: Users
}
