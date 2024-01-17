import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { Productos } from "./Productos"
import { StoreAnalytics } from "./StoreAnalytics"
import { Subcategorias } from "./Subcategorias"
import { Tiendas } from "./Tiendas"

@Index("categoria_productos_tienda_foreign", ["tienda"], {})
@Entity("categoria_productos", { schema: "komercia_prod" })
export class CategoriaProductos {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "nombre_categoria_producto", length: 60 })
	nombreCategoriaProducto: string

	@Column("int", { name: "tienda", unsigned: true })
	tienda: number

	@Column("text", { name: "descripcion", nullable: true })
	descripcion: string | null

	@Column("varchar", { name: "foto_banner", nullable: true, length: 255 })
	fotoBanner: string | null

	@Column("int", { name: "orden", nullable: true })
	orden: number | null

	@Column("varchar", { name: "foto_icono", nullable: true, length: 255 })
	fotoIcono: string | null

	@Column("varchar", { name: "id_cloudinary", nullable: true, length: 255 })
	idCloudinary: string | null

	@Column("varchar", { name: "imagen_cloudinary", nullable: true, length: 255 })
	imagenCloudinary: string | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.categoriaProductos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda", referencedColumnName: "id" }])
	tienda2: Tiendas

	@OneToMany(() => Productos, (productos) => productos.categoriaProducto2)
	productos: Productos[]

	@OneToMany(() => Subcategorias, (subcategorias) => subcategorias.categoria2)
	subcategorias: Subcategorias[]

	@OneToMany(() => StoreAnalytics, (storeAnalytics) => storeAnalytics.storeId)
	analytics: StoreAnalytics[]
}
