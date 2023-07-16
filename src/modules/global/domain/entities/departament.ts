import { CityEntity } from "./city"

export interface DepartamentEntityProps {
	id: number
	name: string
	countryId: number
	cities?: CityEntity[]
}

export class DepartamentEntity implements DepartamentEntityProps {
	id: number
	name: string
	countryId: number
	cities?: CityEntity[]

	constructor({
		id,
		name,
		countryId,
		cities
	}: {
		id: number
		name: string
		countryId: number
		cities?: CityEntity[]
	}) {
		this.id = id
		this.name = name
		this.countryId = countryId
		this.cities = cities
	}
}
