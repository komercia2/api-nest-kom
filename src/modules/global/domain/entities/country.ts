import { DepartamentEntity } from "./departament"

export interface CountryEntityProps {
	id: number
	name: string
	code: string | null
	callSign: string | null
	departaments?: DepartamentEntity[]
}

export class CountryEntity implements CountryEntityProps {
	id: number
	name: string
	code: string | null
	callSign: string | null
	departaments?: DepartamentEntity[]

	constructor(props: CountryEntityProps) {
		this.id = props.id
		this.name = props.name
		this.code = props.code
		this.callSign = props.callSign
		this.departaments = props.departaments
	}

	static fromPrimivites(props: CountryEntityProps) {
		return new CountryEntity(props)
	}
}
