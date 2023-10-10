import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("geolocalizacion_tienda_foreign", ["tienda"], {})
@Entity("geolocalizacion", { schema: "komercia_prod" })
export class Geolocalizacion {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "nombre_sede", nullable: true, length: 255 })
	nombreSede: string | null

	@Column("int", { name: "tienda", unsigned: true })
	tienda: number

	@Column("varchar", { name: "direccion", length: 255 })
	direccion: string

	@Column("double", { name: "latitud", precision: 22 })
	latitud: number

	@Column("double", { name: "longitud", precision: 22 })
	longitud: number

	@Column("int", { name: "ciudad", unsigned: true })
	ciudad: number

	@Column("varchar", { name: "horario", nullable: true, length: 255 })
	horario: string | null

	@Column("varchar", { name: "foto_tienda", nullable: true, length: 255 })
	fotoTienda: string | null

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

	@Column("varchar", { name: "telefono", nullable: true, length: 255 })
	telefono: string | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.geolocalizacions, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda", referencedColumnName: "id" }])
	tienda2: Tiendas
}
