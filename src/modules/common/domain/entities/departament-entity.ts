interface IDepartamentEntity {
	id: number
	name: string
	countryId: number
}

export class DepartamentEntity implements IDepartamentEntity {
	id: number
	name: string
	countryId: number

	constructor(departament: IDepartamentEntity) {
		this.id = departament.id
		this.name = departament.name
		this.countryId = departament.countryId
	}
}
