import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Entity("categoria_tiendas", { schema: "komercia_prod" })
export class CategoriaTiendas {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "nombre_categoria", length: 60 })
	nombreCategoria: string

	@OneToMany(() => Tiendas, (tiendas) => tiendas.categoria2)
	tiendas: Tiendas[]
}
