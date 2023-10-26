interface IStoreBlog {
	id: string
	title: string
	content: string
	author: string
	mainImage: string
	mainImageId: string
	slug: string
	summary: string
	storeId: number
	createdAt: Date | null
	updatedAt: Date | null
	status: boolean
}

export class StoreBlogEntity implements IStoreBlog {
	id: string
	title: string
	content: string
	author: string
	mainImage: string
	mainImageId: string
	slug: string
	summary: string
	storeId: number
	createdAt: Date | null
	updatedAt: Date | null
	status: boolean

	constructor(props: IStoreBlog) {
		this.id = props.id
		this.title = props.title
		this.content = props.content
		this.author = props.author
		this.mainImage = props.mainImage
		this.mainImageId = props.mainImageId
		this.slug = props.slug
		this.summary = props.summary
		this.storeId = props.storeId
		this.createdAt = props.createdAt
		this.updatedAt = props.updatedAt
		this.status = props.status
	}
}
