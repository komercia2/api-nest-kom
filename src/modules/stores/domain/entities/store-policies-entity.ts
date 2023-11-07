interface IStorePoliciesEntity {
	idTienda: number
	envios: string | null
	pagos: string | null
	createdAt: Date
	updatedAt: Date | null
	datos: string | null
	garantia: string | null
	devolucion: string | null
	cambio: string | null
}

export class StorePoliciesEntity implements IStorePoliciesEntity {
	idTienda: number
	envios: string | null
	pagos: string | null
	createdAt: Date
	updatedAt: Date | null
	datos: string | null
	garantia: string | null
	devolucion: string | null
	cambio: string | null

	constructor(data: IStorePoliciesEntity) {
		this.idTienda = data.idTienda
		this.envios = data.envios
		this.pagos = data.pagos
		this.createdAt = data.createdAt
		this.updatedAt = data.updatedAt
		this.datos = data.datos
		this.garantia = data.garantia
		this.devolucion = data.devolucion
		this.cambio = data.cambio
	}
}
