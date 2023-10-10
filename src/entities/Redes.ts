import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("redes_id_foreign", ["id"], {})
@Entity("redes", { schema: "komercia_prod" })
export class Redes {
	@Column("int", { primary: true, name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "facebook", nullable: true, length: 255 })
	facebook: string | null

	@Column("varchar", { name: "instagram", nullable: true, length: 255 })
	instagram: string | null

	@Column("varchar", { name: "twitter", nullable: true, length: 255 })
	twitter: string | null

	@Column("varchar", { name: "youtube", nullable: true, length: 255 })
	youtube: string | null

	@Column("varchar", { name: "whatsapp", nullable: true, length: 255 })
	whatsapp: string | null

	@Column("varchar", { name: "tiktok", nullable: true, length: 255 })
	tiktok: string | null

	@OneToOne(() => Tiendas, (tiendas) => tiendas.redes, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
