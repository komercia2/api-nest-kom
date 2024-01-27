import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from "typeorm"

import { Tiendas } from "./Tiendas"

@Entity({ name: "stores_notifications" })
export class StoreNotification {
	@PrimaryGeneratedColumn("uuid")
	id: string

	@Column({ type: "int", name: "storeId" })
	storeId: number

	@Column({ type: "json" })
	notification: Record<string, unknown>

	@Column({ type: "tinyint", default: 0 })
	readed: number

	@Column({ type: "int", unsigned: true, nullable: false })
	priority: number

	@CreateDateColumn({ type: "datetime", name: "occurredAt" })
	occurredAt: Date

	@ManyToOne(() => Tiendas, (store) => store.notifications, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE"
	})
	@JoinColumn({ name: "storeId" })
	store: Tiendas
}
