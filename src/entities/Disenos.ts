import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from "typeorm"

import { Temas } from "./Temas"
import { Tiendas } from "./Tiendas"

@Index("disenos_tema_foreign", ["tema"], {})
@Entity("disenos", { schema: "komercia_prod" })
export class Disenos {
	@Column("int", { primary: true, name: "id_design", unsigned: true })
	idDesign: number

	@Column("int", { name: "tema", unsigned: true })
	tema: number

	@Column("char", { name: "color_principal", length: 7 })
	colorPrincipal: string

	@Column("char", { name: "color_secundario", length: 7 })
	colorSecundario: string

	@Column("char", { name: "color_texto", length: 7 })
	colorTexto: string

	@Column("varchar", { name: "color_fondo", nullable: true, length: 255 })
	colorFondo: string | null

	@Column("varchar", { name: "fuente", nullable: true, length: 255 })
	fuente: string | null

	@Column("varchar", { name: "fondo", nullable: true, length: 255 })
	fondo: string | null

	@OneToOne(() => Tiendas, (tiendas) => tiendas.disenos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_design", referencedColumnName: "id" }])
	idDesign2: Tiendas

	@ManyToOne(() => Temas, (temas) => temas.disenos, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tema", referencedColumnName: "id" }])
	tema2: Temas
}
