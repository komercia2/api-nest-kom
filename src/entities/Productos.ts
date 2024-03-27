import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from "typeorm"

import { CarritosProductosWhatsapp } from "./CarritosProductosWhatsapp"
import { CategoriaProductos } from "./CategoriaProductos"
import { ProductosCarritos } from "./ProductosCarritos"
import { ProductosDropshipping } from "./ProductosDropshipping"
import { ProductosFotos } from "./ProductosFotos"
import { ProductosInfo } from "./ProductosInfo"
import { ProductosVariantes } from "./ProductosVariantes"
import { StoreAnalytics } from "./StoreAnalytics"
import { StoresCouponsPlus } from "./StoresCouponsPlus"
import { Subcategorias } from "./Subcategorias"
import { TagProduct } from "./TagProduct"
import { TiendaPromociones } from "./TiendaPromociones"
import { Tiendas } from "./Tiendas"

@Index("productos_slug_unique", ["slug"], { unique: true })
@Index("productos_tienda_foreign", ["tienda"], {})
@Index("productos_categoria_producto_foreign", ["categoriaProducto"], {})
@Index("productos_subcategoria_foreign", ["subcategoria"], {})
@Entity("productos", { schema: "komercia_prod" })
export class Productos {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("int", { name: "tienda", unsigned: true })
	tienda: number

	@Column("varchar", { name: "nombre", length: 255 })
	nombre: string

	@Column("int", { name: "categoria_producto", unsigned: true })
	categoriaProducto: number

	@Column("int", { name: "subcategoria", unsigned: true })
	subcategoria: number

	@Column("float", { name: "precio", nullable: true, precision: 12 })
	precio: number | null

	@Column("varchar", { name: "foto", length: 500 })
	foto: string

	@Column("tinyint", { name: "activo", width: 1, default: () => "'1'" })
	activo: boolean

	@Column("varchar", { name: "disponibilidad", nullable: true, length: 10 })
	disponibilidad: string | null

	@Column("longtext", { name: "foto_cloudinary" })
	fotoCloudinary: string

	@Column("varchar", { name: "slug", nullable: true, unique: true, length: 255 })
	slug: string | null

	@Column("timestamp", { name: "deleted_at", nullable: true })
	deletedAt: Date | null

	@Column("varchar", { name: "id_cloudinary", nullable: true, length: 255 })
	idCloudinary: string | null

	@Column("tinyint", { name: "envio_gratis", nullable: true, width: 1 })
	envioGratis: boolean | null

	@Column("tinyint", { name: "con_variante", nullable: true, width: 1 })
	conVariante: boolean | null

	@Column("varchar", { name: "valor_compra", nullable: true, length: 255 })
	valorCompra: string | null

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("varchar", { name: "tag", nullable: true, length: 255 })
	tag: string | null

	@Column("tinyint", { name: "favorito", nullable: true, width: 1, default: () => "'0'" })
	favorito: boolean | null

	@Column("int", { name: "orden", nullable: true })
	orden: number | null

	@Column("tinyint", { name: "ml_published", width: 1, default: () => "'0'" })
	mlPublished: boolean

	@Column("varchar", { name: "id_siigo", nullable: true, length: 255 })
	idSiigo: string | null

	@OneToMany(
		() => CarritosProductosWhatsapp,
		(carritosProductosWhatsapp) => carritosProductosWhatsapp.productos
	)
	carritosProductosWhatsapps: CarritosProductosWhatsapp[]

	@ManyToOne(() => CategoriaProductos, (categoriaProductos) => categoriaProductos.productos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "categoria_producto", referencedColumnName: "id" }])
	categoriaProducto2: CategoriaProductos

	@ManyToOne(() => Subcategorias, (subcategorias) => subcategorias.productos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "subcategoria", referencedColumnName: "id" }])
	subcategoria2: Subcategorias

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.productos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda", referencedColumnName: "id" }])
	tienda2: Tiendas

	@OneToMany(() => ProductosCarritos, (productosCarritos) => productosCarritos.producto2)
	productosCarritos: ProductosCarritos[]

	@OneToMany(
		() => ProductosDropshipping,
		(productosDropshipping) => productosDropshipping.productos
	)
	productosDropshippings: ProductosDropshipping[]

	@OneToMany(() => ProductosFotos, (productosFotos) => productosFotos.idProducto2)
	productosFotos: ProductosFotos[]

	@OneToOne(() => ProductosInfo, (productosInfo) => productosInfo.productos)
	productosInfo: ProductosInfo

	@OneToMany(() => ProductosVariantes, (productosVariantes) => productosVariantes.idProducto2)
	productosVariantes: ProductosVariantes[]

	@OneToMany(() => TagProduct, (tagProduct) => tagProduct.productos)
	tagProducts: TagProduct[]

	@OneToMany(() => TiendaPromociones, (tiendaPromociones) => tiendaPromociones.idProducto2)
	tiendaPromociones: TiendaPromociones[]

	@OneToMany(() => StoreAnalytics, (storeAnalytics) => storeAnalytics.Productos)
	analytics: StoreAnalytics[]

	@OneToMany(() => StoresCouponsPlus, (storesCouponsPlus) => storesCouponsPlus.product)
	storesCouponsPlus: StoresCouponsPlus[]
}
