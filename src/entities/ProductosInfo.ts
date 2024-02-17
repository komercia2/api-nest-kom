import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from "typeorm"

import { Productos } from "./Productos"
import { Proveedores } from "./Proveedores"

@Index("productos_info_proveedores_id_foreign", ["proveedoresId"], {})
@Entity("productos_info", { schema: "komercia_prod" })
export class ProductosInfo {
	@Column("int", { primary: true, name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "marca", nullable: true, length: 255 })
	marca: string | null

	@Column("varchar", { name: "sku", nullable: true, length: 255 })
	sku: string | null

	@Column("varchar", { name: "peso", nullable: true, length: 255 })
	peso: string | null

	@Column("longtext", { name: "descripcion", nullable: true, select: false })
	descripcion: string | null

	@Column("int", { name: "inventario", nullable: true })
	inventario: number | null

	@Column("varchar", { name: "video", nullable: true, length: 255 })
	video: string | null

	@Column("int", { name: "visitas", default: () => "'1'" })
	visitas: number

	@Column("int", { name: "positiva" })
	positiva: number

	@Column("int", { name: "negativa" })
	negativa: number

	@Column("varchar", { name: "garantia", nullable: true, length: 255 })
	garantia: string | null

	@Column("varchar", { name: "codigo_barras", nullable: true, length: 255 })
	codigoBarras: string | null

	@Column("varchar", { name: "codigo_qr", nullable: true, length: 255 })
	codigoQr: string | null

	@Column("int", { name: "proveedores_id", nullable: true, unsigned: true })
	proveedoresId: number | null

	@Column("varchar", { name: "tipo_servicio", nullable: true, length: 255 })
	tipoServicio: string | null

	@Column("varchar", { name: "boton_compra", nullable: true, length: 255 })
	botonCompra: string | null

	@Column("varchar", { name: "boton_whatsapp", nullable: true, length: 255 })
	botonWhatsapp: string | null

	@Column("varchar", { name: "boton_personalizado", nullable: true, length: 255 })
	botonPersonalizado: string | null

	@Column("varchar", { name: "texto_boton_personalizado", nullable: true, length: 255 })
	textoBotonPersonalizado: string | null

	@Column("varchar", { name: "url_boton_personalizado", nullable: true, length: 255 })
	urlBotonPersonalizado: string | null

	@Column("tinyint", { name: "activar_mensajes", nullable: true, width: 1 })
	activarMensajes: boolean | null

	@Column("varchar", { name: "label_mensaje", nullable: true, length: 255 })
	labelMensaje: string | null

	@Column("tinyint", { name: "mensaje_obligatorio", nullable: true, width: 1 })
	mensajeObligatorio: boolean | null

	@Column("varchar", { name: "mensaje", nullable: true, length: 255 })
	mensaje: string | null

	@Column("varchar", { name: "iframe", nullable: true, length: 255 })
	iframe: string | null

	@Column("varchar", { name: "descripcion_corta", nullable: true, length: 255 })
	descripcionCorta: string | null

	@Column("int", { name: "promocion_valor", nullable: true })
	promocionValor: number | null

	@Column("varchar", { name: "tag_promocion", nullable: true, length: 255 })
	tagPromocion: string | null

	@Column("varchar", { name: "etiquetas", nullable: true, length: 255 })
	etiquetas: string | null

	@Column("varchar", { name: "bodega", nullable: true, length: 255 })
	bodega: string | null

	@Column("int", { name: "alto", nullable: true })
	alto: number | null

	@Column("int", { name: "ancho", nullable: true })
	ancho: number | null

	@Column("int", { name: "largo", nullable: true })
	largo: number | null

	@Column("varchar", { name: "dealer_whatsapp", nullable: true, length: 255 })
	dealerWhatsapp: string | null

	@Column("tinyint", { name: "condicion", nullable: true, width: 1, default: () => "'1'" })
	condicion: boolean | null

	@OneToOne(() => Productos, (productos) => productos.productosInfo, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id", referencedColumnName: "id" }])
	productos: Productos

	@ManyToOne(() => Proveedores, (proveedores) => proveedores.productosInfos, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "proveedores_id", referencedColumnName: "id" }])
	proveedores: Proveedores
}
