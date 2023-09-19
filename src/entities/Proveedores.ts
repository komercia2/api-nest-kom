import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { ProductosInfo } from "./ProductosInfo"
import { Tiendas } from "./Tiendas"

@Index("proveedores_tienda_id_foreign", ["tiendaId"], {})
@Entity("proveedores", { schema: "komercia_prod" })
export class Proveedores {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "nombre", length: 255 })
	nombre: string

	@Column("varchar", { name: "direccion", nullable: true, length: 255 })
	direccion: string | null

	@Column("varchar", { name: "telefono", nullable: true, length: 255 })
	telefono: string | null

	@Column("int", { name: "tienda_id", unsigned: true })
	tiendaId: number

	@Column("timestamp", { name: "deleted_at", nullable: true })
	deletedAt: Date | null

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@OneToMany(() => ProductosInfo, (productosInfo) => productosInfo.proveedores)
	productosInfos: ProductosInfo[]

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.proveedores, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda_id", referencedColumnName: "id" }])
	tienda: Tiendas
}
