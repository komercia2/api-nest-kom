import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { City } from "./city"
import { Country } from "./country"

@Index("departamentos_paises_id_foreign", ["paisesId"], {})
@Entity("departamentos", { schema: "komercia_dev" })
export class Departament {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "nombre_dep", length: 60 })
	nombreDep: string

	@Column("int", { name: "paises_id", unsigned: true, default: () => "'1'" })
	paisesId: number

	@OneToMany(() => City, (city) => city.dep2)
	ciudades: City[]

	@ManyToOne(() => Country, (country) => country.departamentos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "paises_id", referencedColumnName: "id" }])
	paises: Country
}
