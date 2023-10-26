import { DepartamentEntity } from "./departament-entity"

interface ICityEntity {
	id: number
	name: string
	departmentId: number
	daneCode: string | null
	depatament: DepartamentEntity
}

export class CityEntity implements ICityEntity {
	id: number
	name: string
	departmentId: number
	daneCode: string | null
	depatament: DepartamentEntity

	constructor(city: ICityEntity) {
		this.id = city.id
		this.name = city.name
		this.departmentId = city.departmentId
		this.daneCode = city.daneCode
		this.depatament = city.depatament
	}
}
