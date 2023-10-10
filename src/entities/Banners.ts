import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("banners_tienda_foreign", ["tienda"], {})
@Entity("banners", { schema: "komercia_prod" })
export class Banners {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("int", { name: "tienda", unsigned: true })
	tienda: number

	@Column("varchar", { name: "ruta_banner", length: 70 })
	rutaBanner: string

	@Column("int", { name: "order", nullable: true })
	order: number | null

	@Column("varchar", { name: "redireccion", nullable: true, length: 60 })
	redireccion: string | null

	@Column("varchar", { name: "titulo", nullable: true, length: 255 })
	titulo: string | null

	@Column("longtext", { name: "descripcion", nullable: true })
	descripcion: string | null

	@Column("varchar", { name: "foto_cloudinary", nullable: true, length: 255 })
	fotoCloudinary: string | null

	@Column("varchar", {
		name: "posicion",
		nullable: true,
		length: 255,
		default: () => "'left'"
	})
	posicion: string | null

	@Column("varchar", { name: "id_cloudinary", nullable: true, length: 255 })
	idCloudinary: string | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.banners, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda", referencedColumnName: "id" }])
	tienda2: Tiendas
}
