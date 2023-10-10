import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Paises } from "./Paises"

@Index("departamentos_paises_id_foreign", ["paisesId"], {})
@Entity("departamentos", { schema: "komercia_prod" })
export class Departamentos {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "nombre_dep", length: 60 })
	nombreDep: string

	@Column("int", { name: "paises_id", unsigned: true, default: () => "'1'" })
	paisesId: number

	@ManyToOne(() => Paises, (paises) => paises.departamentos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "paises_id", referencedColumnName: "id" }])
	paises: Paises
}
