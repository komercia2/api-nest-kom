import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { TiendaFacturacion } from "./TiendaFacturacion"

@Index("facturas_dataico_tienda_facturacion_id_foreign", ["tiendaFacturacionId"], {})
@Entity("facturas_dataico", { schema: "komercia_prod" })
export class FacturasDataico {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "number", length: 255 })
	number: string

	@Column("varchar", { name: "issue_date", length: 255 })
	issueDate: string

	@Column("varchar", { name: "order_reference", length: 255 })
	orderReference: string

	@Column("varchar", { name: "invoice_type_code", length: 255 })
	invoiceTypeCode: string

	@Column("varchar", { name: "payment_means", length: 255 })
	paymentMeans: string

	@Column("varchar", { name: "payment_means_type", length: 255 })
	paymentMeansType: string

	@Column("varchar", { name: "items_sku", length: 255 })
	itemsSku: string

	@Column("varchar", { name: "items_quantity", length: 255 })
	itemsQuantity: string

	@Column("varchar", { name: "items_description", length: 255 })
	itemsDescription: string

	@Column("varchar", { name: "items_price", length: 255 })
	itemsPrice: string

	@Column("varchar", { name: "taxes_tax_category", length: 255 })
	taxesTaxCategory: string

	@Column("varchar", { name: "taxes_tax_rate", length: 255 })
	taxesTaxRate: string

	@Column("varchar", { name: "retentions_tax_category", length: 255 })
	retentionsTaxCategory: string

	@Column("varchar", { name: "retentions_tax_rate", length: 255 })
	retentionsTaxRate: string

	@Column("bigint", { name: "tienda_facturacion_id", unsigned: true })
	tiendaFacturacionId: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => TiendaFacturacion, (tiendaFacturacion) => tiendaFacturacion.facturasDataicos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda_facturacion_id", referencedColumnName: "id" }])
	tiendaFacturacion: TiendaFacturacion
}
