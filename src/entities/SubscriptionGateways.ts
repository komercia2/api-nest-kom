import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { Subscriptions } from "./Subscriptions"

@Entity("subscription_gateways", { schema: "komercia_prod" })
export class SubscriptionGateways {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "name", length: 255 })
	name: string

	@Column("tinyint", { name: "has_hook", width: 1 })
	hasHook: boolean

	@OneToMany(() => Subscriptions, (subscriptions) => subscriptions.subscriptionGateway)
	subscriptions: Subscriptions[]
}
