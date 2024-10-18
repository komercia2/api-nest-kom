import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Entity("bot_info")
export class BotInfo {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ name: "store_id", type: "int", unsigned: true })
	storeId: number

	@Column({ default: 1 })
	status: number

	@Column({ type: "longtext", nullable: true })
	info: string | null

	@OneToOne(() => Tiendas, (store) => store.botInfo)
	@JoinColumn({ name: "store_id" })
	store: Tiendas
}
