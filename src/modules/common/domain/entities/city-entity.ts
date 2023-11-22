import { DepartamentEntity } from "./departament-entity"

interface ICityEntity {
	id: number
	nombre_ciu: string
	dep: number
	codigo_dane: string | null
	departamento: DepartamentEntity
}

export class CityEntity implements ICityEntity {
	id: number
	nombre_ciu: string
	dep: number
	codigo_dane: string | null
	departamento: DepartamentEntity

	constructor(city: ICityEntity) {
		this.id = city.id
		this.nombre_ciu = city.nombre_ciu
		this.dep = city.dep
		this.codigo_dane = city.codigo_dane
		this.departamento = city.departamento
	}
}
