import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Users } from "./Users"

@Index("user_credit_card_users_id_foreign", ["usersId"], {})
@Entity("user_credit_card", { schema: "komercia_prod" })
export class UserCreditCard {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "token_card", length: 255 })
	tokenCard: string

	@Column("varchar", { name: "customer_id", length: 255 })
	customerId: string

	@Column("int", { name: "users_id", unsigned: true })
	usersId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Users, (users) => users.userCreditCards, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "users_id", referencedColumnName: "id" }])
	users: Users
}
