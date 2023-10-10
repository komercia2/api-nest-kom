import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { Paises } from "./Paises"
import { TiendaConsignacionInfo } from "./TiendaConsignacionInfo"

@Index("bancos_paises_id_foreign", ["paisesId"], {})
@Entity("bancos", { schema: "komercia_prod" })
export class Bancos {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "nombre", length: 255 })
	nombre: string

	@Column("varchar", { name: "imagen", length: 255 })
	imagen: string

	@Column("timestamp", {
		name: "created_at",
		default: () => "'0000-00-00 00:00:00'"
	})
	createdAt: Date

	@Column("timestamp", {
		name: "updated_at",
		default: () => "'0000-00-00 00:00:00'"
	})
	updatedAt: Date

	@Column("int", { name: "paises_id", nullable: true, unsigned: true })
	paisesId: number | null

	@ManyToOne(() => Paises, (paises) => paises.bancos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "paises_id", referencedColumnName: "id" }])
	paises: Paises

	@OneToMany(
		() => TiendaConsignacionInfo,
		(tiendaConsignacionInfo) => tiendaConsignacionInfo.bancos
	)
	tiendaConsignacionInfos: TiendaConsignacionInfo[]
}
