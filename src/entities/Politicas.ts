import { Column, Entity, JoinColumn, OneToOne } from "typeorm"

import { Tiendas } from "./Tiendas"

@Entity("politicas", { schema: "komercia_prod" })
export class Politicas {
	@Column("int", { primary: true, name: "id_tienda", unsigned: true })
	idTienda: number

	@Column("longtext", { name: "envios", nullable: true })
	envios: string | null

	@Column("longtext", { name: "pagos", nullable: true })
	pagos: string | null

	@Column("datetime", { name: "created_at" })
	createdAt: Date

	@Column("datetime", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("longtext", { name: "datos", nullable: true })
	datos: string | null

	@Column("longtext", { name: "garantia", nullable: true })
	garantia: string | null

	@Column("longtext", { name: "devolucion", nullable: true })
	devolucion: string | null

	@Column("longtext", { name: "cambio", nullable: true })
	cambio: string | null

	@OneToOne(() => Tiendas, (tiendas) => tiendas.politicas, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_tienda", referencedColumnName: "id" }])
	idTienda2: Tiendas
}
