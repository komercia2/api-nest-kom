import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { Ciudades } from "./Ciudades"
import { Tiendas } from "./Tiendas"
import { ZonasPaths } from "./ZonasPaths"

@Index("zonas_ciudades_id_foreign", ["ciudadesId"], {})
@Index("zonas_tiendas_id_foreign", ["tiendasId"], {})
@Entity("zonas", { schema: "komercia_prod" })
export class Zonas {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "name", length: 255 })
	name: string

	@Column("varchar", { name: "delivery_time", length: 255 })
	deliveryTime: string

	@Column("bigint", { name: "price" })
	price: string

	@Column("int", { name: "ciudades_id", nullable: true, unsigned: true })
	ciudadesId: number | null

	@Column("int", { name: "tiendas_id", nullable: true, unsigned: true })
	tiendasId: number | null

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Ciudades, (ciudades) => ciudades.zonas, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "ciudades_id", referencedColumnName: "id" }])
	ciudades: Ciudades

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.zonas, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas

	@OneToMany(() => ZonasPaths, (zonasPaths) => zonasPaths.zonas)
	zonasPaths: ZonasPaths[]
}
