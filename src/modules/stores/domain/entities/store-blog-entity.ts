interface IStoreBlog {
	id: string
	titulo: string
	contenido: string
	autor: string | null
	imagen_principal_url: string
	imagen_principal_id: string
	slug: string | null
	resumen: string | null
	created_at: Date | null
	updated_at: Date | null
	estado: boolean
}

export class StoreBlogEntity implements IStoreBlog {
	id: string
	titulo: string
	contenido: string
	autor: string | null
	imagen_principal_url: string
	imagen_principal_id: string
	slug: string | null
	resumen: string | null
	created_at: Date | null
	updated_at: Date | null
	estado: boolean

	constructor(props: IStoreBlog) {
		this.id = props.id
		this.titulo = props.titulo
		this.contenido = props.contenido
		this.autor = props.autor
		this.imagen_principal_url = props.imagen_principal_url
		this.imagen_principal_id = props.imagen_principal_id
		this.slug = props.slug
		this.resumen = props.resumen
		this.created_at = props.created_at
		this.updated_at = props.updated_at
		this.estado = props.estado
	}
}
