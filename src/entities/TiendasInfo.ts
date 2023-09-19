import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from "typeorm"

import { Paises } from "./Paises"
import { Tiendas } from "./Tiendas"

@Index("tiendas_info_paises_id_foreign", ["paisesId"], {})
@Entity("tiendas_info", { schema: "komercia_prod" })
export class TiendasInfo {
	@Column("int", { primary: true, name: "tienda_info", unsigned: true })
	tiendaInfo: number

	@Column("varchar", { name: "dominio", nullable: true, length: 255 })
	dominio: string | null

	@Column("text", { name: "descripcion", nullable: true })
	descripcion: string | null

	@Column("varchar", { name: "telefono", length: 40 })
	telefono: string

	@Column("varchar", { name: "email_tienda", nullable: true, length: 60 })
	emailTienda: string | null

	@Column("varchar", { name: "moneda", nullable: true, length: 255 })
	moneda: string | null

	@Column("varchar", { name: "lenguaje", length: 255, default: () => "'ES'" })
	lenguaje: string

	@Column("int", { name: "paises_id", unsigned: true, default: () => "'1'" })
	paisesId: number

	@Column("varchar", { name: "favicon", nullable: true, length: 255 })
	favicon: string | null

	@Column("varchar", { name: "fachada", nullable: true, length: 255 })
	fachada: string | null

	@Column("text", { name: "etiquetas", nullable: true })
	etiquetas: string | null

	@Column("varchar", { name: "expert", nullable: true, length: 255 })
	expert: string | null

	@Column("int", { name: "valor_compra_minimo", nullable: true })
	valorCompraMinimo: number | null

	@Column("varchar", { name: "regimen", nullable: true, length: 255 })
	regimen: string | null

	@Column("varchar", { name: "nit", nullable: true, length: 255 })
	nit: string | null

	@ManyToOne(() => Paises, (paises) => paises.tiendasInfos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "paises_id", referencedColumnName: "id" }])
	paises: Paises

	@OneToOne(() => Tiendas, (tiendas) => tiendas.tiendasInfo, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda_info", referencedColumnName: "id" }])
	tiendaInfo2: Tiendas
}
