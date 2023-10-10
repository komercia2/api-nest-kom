import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Carritos } from "./Carritos"

@Index("carrito_informacion_pago_x_id_factura_foreign", ["xIdFactura"], {})
@Entity("carrito_informacion_pago", { schema: "komercia_prod" })
export class CarritoInformacionPago {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("int", { name: "x_id_factura", unsigned: true })
	xIdFactura: number

	@Column("varchar", { name: "x_cust_id_cliente", length: 255 })
	xCustIdCliente: string

	@Column("varchar", { name: "x_currency_code", length: 255 })
	xCurrencyCode: string

	@Column("varchar", { name: "x_amount", length: 255 })
	xAmount: string

	@Column("varchar", { name: "x_approval_code", length: 255 })
	xApprovalCode: string

	@Column("varchar", { name: "x_franchise", length: 255 })
	xFranchise: string

	@Column("varchar", { name: "x_fecha_transaccion", length: 255 })
	xFechaTransaccion: string

	@Column("varchar", { name: "x_transaction_id", length: 255 })
	xTransactionId: string

	@Column("varchar", { name: "x_ref_payco", length: 255 })
	xRefPayco: string

	@Column("varchar", { name: "x_cod_transaction_state", length: 255 })
	xCodTransactionState: string

	@Column("varchar", { name: "x_transaction_state", length: 255 })
	xTransactionState: string

	@Column("varchar", { name: "x_signature", length: 255 })
	xSignature: string

	@Column("varchar", { name: "x_response", length: 255 })
	xResponse: string

	@Column("varchar", { name: "x_response_reason_text", length: 255 })
	xResponseReasonText: string

	@Column("varchar", { name: "x_customer_name", length: 255 })
	xCustomerName: string

	@Column("varchar", { name: "x_customer_lastname", length: 255 })
	xCustomerLastname: string

	@Column("varchar", { name: "x_customer_email", length: 255 })
	xCustomerEmail: string

	@Column("varchar", { name: "x_customer_ip", length: 255 })
	xCustomerIp: string

	@ManyToOne(() => Carritos, (carritos) => carritos.carritoInformacionPagos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "x_id_factura", referencedColumnName: "id" }])
	xIdFactura2: Carritos
}
