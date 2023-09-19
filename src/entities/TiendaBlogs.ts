import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("tienda_blogs_tiendas_id_foreign", ["tiendasId"], {})
@Entity("tienda_blogs", { schema: "komercia_prod" })
export class TiendaBlogs {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "titulo", length: 255 })
	titulo: string

	@Column("longtext", { name: "contenido" })
	contenido: string

	@Column("varchar", { name: "autor", nullable: true, length: 255 })
	autor: string | null

	@Column("varchar", { name: "imagen_principal_url", length: 255 })
	imagenPrincipalUrl: string

	@Column("varchar", { name: "imagen_principal_id", length: 255 })
	imagenPrincipalId: string

	@Column("varchar", { name: "slug", length: 255 })
	slug: string

	@Column("varchar", { name: "resumen", nullable: true, length: 255 })
	resumen: string | null

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("tinyint", { name: "estado", width: 1, default: () => "'0'" })
	estado: boolean

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendaBlogs, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
