import { Column, Entity, JoinColumn, OneToOne } from "typeorm"

import { Tiendas } from "./Tiendas"

@Entity("tiendas_pages", { schema: "komercia_prod" })
export class TiendasPages {
	@Column("int", { primary: true, name: "tienda_page", unsigned: true })
	tiendaPage: number

	@Column("text", { name: "mision" })
	mision: string

	@Column("text", { name: "vision" })
	vision: string

	@Column("text", { name: "nosotros" })
	nosotros: string

	@Column("text", { name: "garantia" })
	garantia: string

	@Column("text", { name: "politicas" })
	politicas: string

	@Column("varchar", { name: "img_oficina", length: 255 })
	imgOficina: string

	@Column("varchar", { name: "img_equipo", length: 255 })
	imgEquipo: string

	@OneToOne(() => Tiendas, (tiendas) => tiendas.tiendasPages, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda_page", referencedColumnName: "id" }])
	tiendaPage2: Tiendas
}
