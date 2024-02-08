export class StorePaymentMethodsWithoutAuthDto {
	constructor(
		readonly consignacion: Record<string, never> | null,
		readonly efecty: Record<string, never>,
		readonly convenir: boolean,
		readonly tienda: boolean,
		readonly politica_envios: Record<string, never>,
		readonly politica_pagos: Record<string, never>,
		readonly payco: boolean,
		readonly contraentrega: boolean,
		readonly payu: boolean,
		readonly mercadopago: boolean,
		readonly nequi: Record<string, never>,
		readonly daviplata: Record<string, never>,
		readonly wompi: boolean,
		readonly credibanco: boolean,
		readonly flow: boolean,
		readonly paymenths_way: boolean,
		readonly tu_compra: boolean,
		readonly wepay4u: boolean,
		readonly addi: boolean
	) {}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static fromPersistence(data: { [key: string]: any }) {
		return new this(
			data.consignacion,
			data.efecty,
			data.convenir,
			data.tienda,
			data.politica_envios,
			data.politica_pagos,
			data.payco,
			data.contraentrega,
			data.payu,
			data.mercadoPago,
			data.nequi,
			data.daviplata,
			data.wompi,
			data.credibanco,
			data.flow,
			data.paymentsWay,
			data.tuCompra,
			data.wepay4u,
			data.addi
		)
	}
}
