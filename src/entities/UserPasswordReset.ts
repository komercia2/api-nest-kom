import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique
} from "typeorm"

import { Users } from "./Users"

@Entity("user_password_resets")
@Unique(["token"])
export class UserPasswordReset {
	@PrimaryGeneratedColumn({ name: "id" })
	id: number

	@ManyToOne(() => Users, { onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	user: Users

	@Column({ length: 255 })
	token: string

	@Column({ name: "user_id", type: "int", unsigned: true })
	userId: number

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date

	@Column("tinyint", { name: "active", width: 1, default: () => "'0'" })
	active: boolean
}
