import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Carritos } from "./Carritos"
import { Tiendas } from "./Tiendas"

@Index("envios_mipaquete_carritos_id_foreign", ["carritosId"], {})
@Index("envios_mipaquete_tiendas_id_foreign", ["tiendasId"], {})
@Entity("envios_mipaquete", { schema: "komercia_prod" })
export class EnviosMipaquete {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "uuid_mipaquete", nullable: true, length: 255 })
	uuidMipaquete: string | null

	@Column("int", { name: "carritos_id", nullable: true, unsigned: true })
	carritosId: number | null

	@Column("int", { name: "tiendas_id", nullable: true, unsigned: true })
	tiendasId: number | null

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Carritos, (carritos) => carritos.enviosMipaquetes, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "carritos_id", referencedColumnName: "id" }])
	carritos: Carritos

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.enviosMipaquetes, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
