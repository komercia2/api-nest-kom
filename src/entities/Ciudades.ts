import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { Departamentos } from "./Departamentos"
import { DireccionesUsuario } from "./DireccionesUsuario"
import { Tiendas } from "./Tiendas"
import { Users } from "./Users"
import { Zonas } from "./Zonas"

@Index("ciudades_dep_foreign", ["dep"], {})
@Entity("ciudades", { schema: "komercia_prod" })
export class Ciudades {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "nombre_ciu", length: 60 })
	nombreCiu: string

	@Column("int", { name: "dep", unsigned: true })
	dep: number

	@Column("varchar", { name: "codigo_dane", nullable: true, length: 255 })
	codigoDane: string | null

	@ManyToOne(() => Departamentos, (departamento) => departamento.ciudades)
	@JoinColumn({ name: "dep" })
	departamento: Departamentos

	@OneToMany(() => DireccionesUsuario, (direccionesUsuario) => direccionesUsuario.ciudad)
	direccionesUsuarios: DireccionesUsuario[]

	@OneToMany(() => Tiendas, (tiendas) => tiendas.ciudad2)
	tiendas: Tiendas[]

	@OneToMany(() => Users, (users) => users.ciudad2)
	users: Users[]

	@OneToMany(() => Zonas, (zonas) => zonas.ciudades)
	zonas: Zonas[]
}
