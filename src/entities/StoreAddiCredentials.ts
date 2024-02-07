import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryColumn,
	Unique,
	UpdateDateColumn
} from "typeorm"

import { Tiendas } from "./Tiendas"

@Entity("store_addi_credentials")
@Unique(["clientID"])
@Unique(["clientSecret"])
export class StoreAddiCredentials {
	@PrimaryColumn({ type: "int", unsigned: true })
	storeId: number

	@Column({ type: "varchar", length: 255 })
	clientID: string

	@Column({ type: "varchar", length: 255 })
	clientSecret: string

	@CreateDateColumn({ type: "datetime" })
	createdAt: Date

	@UpdateDateColumn({ type: "datetime", nullable: true })
	updatedAt: Date | null

	@DeleteDateColumn({ type: "datetime", nullable: true })
	deletedAt: Date | null

	@OneToOne(() => Tiendas)
	@JoinColumn({ name: "storeId" })
	store: Tiendas
}
