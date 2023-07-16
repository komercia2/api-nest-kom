import { DepartamentEntity } from "./departament"

export interface CityEntityProps {
	id: number
	name: string
	daneCode: string | null
	departamentId: number
	departament?: DepartamentEntity
}

export class CityEntity implements CityEntityProps {
	id: number
	name: string
	daneCode: string | null
	departamentId: number
	departament?: DepartamentEntity

	constructor({
		id,
		name,
		daneCode,
		departamentId,
		departament
	}: {
		id: number
		name: string
		daneCode: string | null
		departamentId: number
		departament?: DepartamentEntity
	}) {
		this.id = id
		this.name = name
		this.daneCode = daneCode
		this.departamentId = departamentId
		this.departament = departament
	}
}
