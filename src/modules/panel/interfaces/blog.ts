export interface IBlog {
	id: string
	titulo: string
	autor: string | null
	contenido: string
	imagen_principal_url: string
	imagen_principal_id: string
	slug: string
	resumen: string | null
	estado: boolean
	created_at: Date | null
	updated_at: Date | null
}
