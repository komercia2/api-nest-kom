import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique
} from "typeorm"

import { Ciudades } from "./Ciudades"

@Entity("external_users")
@Unique(["email"])
@Unique(["phone"])
@Index("external_user_city_idx")
export class ExternalUser {
	@PrimaryGeneratedColumn({ type: "int", unsigned: true })
	id: number

	@Column({ type: "varchar", length: 255 })
	email: string

	@Column({ type: "varchar", length: 255 })
	password: string

	@Column({ type: "varchar", length: 20 })
	phone: string

	@ManyToOne(() => Ciudades)
	@JoinColumn({ name: "city" })
	city: Ciudades

	@Column({ type: "int", unsigned: true })
	role: number
}
