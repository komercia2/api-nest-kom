import { Column, Entity, JoinColumn, OneToOne } from "typeorm"

import { Tiendas } from "./Tiendas"

@Entity("medio_pagos", { schema: "komercia_prod" })
export class MedioPagos {
	@Column("int", { primary: true, name: "id_medios", unsigned: true })
	idMedios: number

	@Column("tinyint", { name: "convenir", width: 1 })
	convenir: boolean

	@Column("tinyint", { name: "consignacion", width: 1 })
	consignacion: boolean

	@Column("tinyint", { name: "payu", width: 1 })
	payu: boolean

	@Column("tinyint", { name: "payco", width: 1 })
	payco: boolean

	@Column("tinyint", { name: "paypal", width: 1 })
	paypal: boolean

	@Column("tinyint", { name: "efecty", width: 1 })
	efecty: boolean

	@Column("tinyint", { name: "tienda", width: 1 })
	tienda: boolean

	@Column("tinyint", { name: "politica_envios", width: 1 })
	politicaEnvios: boolean

	@Column("tinyint", { name: "politica_pagos", width: 1 })
	politicaPagos: boolean

	@Column("datetime", { name: "created_at" })
	createdAt: Date

	@Column("datetime", { name: "updated_at" })
	updatedAt: Date

	@Column("tinyint", { name: "contraentrega", width: 1 })
	contraentrega: boolean

	@Column("tinyint", { name: "mercado_pago", width: 1, default: () => "'0'" })
	mercadoPago: boolean

	@Column("tinyint", { name: "nequi", width: 1, default: () => "'0'" })
	nequi: boolean

	@Column("tinyint", { name: "daviplata", width: 1, default: () => "'0'" })
	daviplata: boolean

	@Column("tinyint", { name: "wompi", width: 1, default: () => "'0'" })
	wompi: boolean

	@Column("tinyint", { name: "credibanco", width: 1, default: () => "'0'" })
	credibanco: boolean

	@Column("tinyint", { name: "flow", width: 1, default: () => "'0'" })
	flow: boolean

	@Column("tinyint", { name: "payments_way", width: 1 })
	paymentsWay: boolean

	@Column("tinyint", { name: "tu_compra", width: 1 })
	tuCompra: boolean

	@Column("tinyint", { name: "wepay4u", width: 1 })
	wepay4u: boolean

	@OneToOne(() => Tiendas, (tiendas) => tiendas.medioPagos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_medios", referencedColumnName: "id" }])
	idMedios2: Tiendas
}
