import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Users } from "./Users"

@Index("users_subscriptions_users_id_foreign", ["usersId"], {})
@Entity("users_subscriptions", { schema: "komercia_prod" })
export class UsersSubscriptions {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "message", length: 255 })
	message: string

	@Column("varchar", { name: "id_subscription", length: 255 })
	idSubscription: string

	@Column("date", { name: "current_period_start" })
	currentPeriodStart: string

	@Column("date", { name: "current_period_end" })
	currentPeriodEnd: string

	@Column("varchar", { name: "status_subscription", length: 255 })
	statusSubscription: string

	@Column("varchar", { name: "id_plan", length: 255 })
	idPlan: string

	@Column("int", { name: "users_id", nullable: true, unsigned: true })
	usersId: number | null

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Users, (users) => users.usersSubscriptions, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "users_id", referencedColumnName: "id" }])
	users: Users
}
