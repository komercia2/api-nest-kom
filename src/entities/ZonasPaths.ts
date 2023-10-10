import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Zonas } from "./Zonas"

@Index("zonas_paths_zonas_id_foreign", ["zonasId"], {})
@Entity("zonas_paths", { schema: "komercia_prod" })
export class ZonasPaths {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("double", { name: "lat", precision: 11, scale: 7 })
	lat: number

	@Column("double", { name: "lng", precision: 11, scale: 7 })
	lng: number

	@Column("bigint", { name: "zonas_id", unsigned: true })
	zonasId: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Zonas, (zonas) => zonas.zonasPaths, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "zonas_id", referencedColumnName: "id" }])
	zonas: Zonas
}
