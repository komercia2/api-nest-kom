import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm"

@Index("rewards_name_index", ["name"], {})
@Entity("rewards", { schema: "komercia_prod" })
export class Rewards {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "name", length: 100 })
	name: string

	@Column("varchar", { name: "image", nullable: true, length: 255 })
	image: string | null

	@Column("int", { name: "referrals_goal", unsigned: true })
	referralsGoal: number

	@Column("text", { name: "description", nullable: true })
	description: string | null

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null
}
