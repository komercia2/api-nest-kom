import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("categorias_tiendas_sugerencias", { schema: "komercia_prod" })
export class CategoriasTiendasSugerencias {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "nombre_categoria", length: 255 })
	nombreCategoria: string
}
