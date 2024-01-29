export const prettifyShippingMethod = (method: string | null): string => {
	let paymentMethodName = "Sin especificar"

	switch (method) {
		case "1":
			paymentMethodName = "ePayco TC"
			break
		case "2":
			paymentMethodName = "ePayco PSE"
			break
		case "3":
			paymentMethodName = "ePayco efectivo"
			break
		case "4":
			paymentMethodName = "Consignación"
			break
		case "5":
			paymentMethodName = "Efecty"
			break
		case "6":
			paymentMethodName = "Paga en Tienda"
			break
		case "7":
			paymentMethodName = "Pago a convenir"
			break
		case "8":
			paymentMethodName = "ePayco SafetyPay"
			break
		case "9":
			paymentMethodName = "Pago contraentrega"
			break
		case "10":
			paymentMethodName = "Mercado Pago TC"
			break
		case "11":
			paymentMethodName = "PayU TC"
			break
		case "12":
			paymentMethodName = "PayU efectivo"
			break
		case "13":
			paymentMethodName = "PayU PSE"
			break
		case "14":
			paymentMethodName = "Mercado Pago PSE"
			break
		case "15":
			paymentMethodName = "Daviplata"
			break
		case "16":
			paymentMethodName = "Nequi"
			break
		case "17":
			paymentMethodName = "Credibanco"
			break
		case "18":
			paymentMethodName = "Wompi"
			break
		case "19":
			paymentMethodName = "FLOW"
			break
		case "20":
			paymentMethodName = "Wepay4U"
			break
		case "21":
			paymentMethodName = "TuCompra"
			break
		case "22":
			paymentMethodName = "HOKO (Recaudo en efectivo)"
			break
		case "23":
			paymentMethodName = "PayU"
			break
		case "24":
			paymentMethodName = "Mercado Pago"
			break
		case "25":
			paymentMethodName = "ePayco"
			break
	}

	return paymentMethodName
}
