import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { Bancos } from "./Bancos"
import { Departamentos } from "./Departamentos"
import { MediosEnvios } from "./MediosEnvios"
import { TiendasInfo } from "./TiendasInfo"

@Entity("paises", { schema: "komercia_prod" })
export class Paises {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "pais", length: 255 })
	pais: string

	@Column("varchar", { name: "codigo", nullable: true, length: 255 })
	codigo: string | null

	@Column("varchar", { name: "indicativo", nullable: true, length: 50 })
	indicativo: string | null

	@OneToMany(() => Bancos, (bancos) => bancos.paises)
	bancos: Bancos[]

	@OneToMany(() => Departamentos, (departamentos) => departamentos.paises)
	departamentos: Departamentos[]

	@OneToMany(() => MediosEnvios, (mediosEnvios) => mediosEnvios.idPais2)
	mediosEnvios: MediosEnvios[]

	@OneToMany(() => TiendasInfo, (tiendasInfo) => tiendasInfo.paises)
	tiendasInfos: TiendasInfo[]
}
