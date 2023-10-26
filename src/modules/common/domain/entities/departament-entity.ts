interface IDepartamentEntity {
	id: number
	nombre_dep: string
	paises_id: number
}

export class DepartamentEntity implements IDepartamentEntity {
	id: number
	nombre_dep: string
	paises_id: number

	constructor(departament: IDepartamentEntity) {
		this.id = departament.id
		this.nombre_dep = departament.nombre_dep
		this.paises_id = departament.paises_id
	}
}
