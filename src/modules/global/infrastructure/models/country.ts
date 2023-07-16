import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { Departament } from "./departament"

@Entity("paises", { schema: "komercia_dev" })
export class Country {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "pais", length: 255 })
	pais: string

	@Column("varchar", { name: "codigo", nullable: true, length: 255 })
	codigo: string | null

	@Column("varchar", { name: "indicativo", nullable: true, length: 50 })
	indicativo: string | null

	@OneToMany(() => Departament, (departament) => departament.paises)
	departamentos: Departament[]
}
