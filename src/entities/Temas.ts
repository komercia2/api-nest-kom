import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { Disenos } from "./Disenos"

@Entity("temas", { schema: "komercia_prod" })
export class Temas {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "imagen", length: 255 })
	imagen: string

	@Column("varchar", { name: "nombre", length: 20 })
	nombre: string

	@Column("varchar", { name: "descripcion", length: 255 })
	descripcion: string

	@Column("varchar", { name: "valor", length: 10 })
	valor: string

	@Column("varchar", { name: "autor", length: 255 })
	autor: string

	@Column("varchar", { name: "img_autor", length: 255 })
	imgAutor: string

	@Column("varchar", { name: "redireccion", nullable: true, length: 255 })
	redireccion: string | null

	@Column("tinyint", { name: "estado", nullable: true, width: 1 })
	estado: boolean | null

	@OneToMany(() => Disenos, (disenos) => disenos.tema2)
	disenos: Disenos[]
}
