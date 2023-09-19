import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("epayco_franquicias", { schema: "komercia_prod" })
export class EpaycoFranquicias {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "codigo", length: 255 })
	codigo: string

	@Column("varchar", { name: "franquicia", length: 255 })
	franquicia: string
}
