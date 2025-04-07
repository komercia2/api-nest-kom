import { Politicas } from "src/entities"

import { IPolicy } from "../interfaces/policies"

export const mapPolicy = (policy: Politicas): IPolicy => ({
	id: policy.idTienda,
	envios: policy.envios,
	pagos: policy.pagos,
	datos: policy.datos,
	garantia: policy.garantia,
	devolucion: policy.devolucion,
	cambio: policy.cambio
})
