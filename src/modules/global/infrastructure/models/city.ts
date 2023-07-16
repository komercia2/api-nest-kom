import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Departament } from "./departament"

@Index("ciudades_dep_foreign", ["dep"], {})
@Entity("ciudades", { schema: "komercia_dev" })
export class City {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "nombre_ciu", length: 60 })
	nombreCiu: string

	@Column("int", { name: "dep", unsigned: true })
	dep: number

	@Column("varchar", { name: "codigo_dane", nullable: true, length: 255 })
	codigoDane: string | null

	@ManyToOne(() => Departament, (departament) => departament.ciudades, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "dep", referencedColumnName: "id" }])
	dep2: Departament
}
