import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { CategoriaProductos } from "./CategoriaProductos"
import { Productos } from "./Productos"
import { Tiendas } from "./Tiendas"

@Index("subcategorias_tienda_foreign", ["tienda"], {})
@Index("subcategorias_categoria_foreign", ["categoria"], {})
@Entity("subcategorias", { schema: "komercia_prod" })
export class Subcategorias {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "nombre_subcategoria", length: 255 })
	nombreSubcategoria: string

	@Column("int", { name: "categoria", unsigned: true })
	categoria: number

	@Column("int", { name: "tienda", unsigned: true })
	tienda: number

	@Column("varchar", { name: "id_cloudinary", nullable: true, length: 255 })
	idCloudinary: string | null

	@Column("varchar", { name: "imagen_cloudinary", nullable: true, length: 255 })
	imagenCloudinary: string | null

	@OneToMany(() => Productos, (productos) => productos.subcategoria2)
	productos: Productos[]

	@ManyToOne(() => CategoriaProductos, (categoriaProductos) => categoriaProductos.subcategorias, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "categoria", referencedColumnName: "id" }])
	categoria2: CategoriaProductos

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.subcategorias, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda", referencedColumnName: "id" }])
	tienda2: Tiendas
}
