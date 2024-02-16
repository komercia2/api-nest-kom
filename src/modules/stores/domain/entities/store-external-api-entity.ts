interface IStoreExternalApi {
	facebook: string | null
	analytics: string | null
	mercadolibre: string | null
	tienda_id: number
	tag_manager: string | null
	tidio_user: string | null
	pixel_facebook: string | null
	facebook_pixel_metatag_1: string | null
	facebook_chat: string | null
	google_merchant: string | null
	addiAllySlug: string | null
}

export class StoreExternalApi implements IStoreExternalApi {
	tienda_id: number
	facebook: string | null
	analytics: string | null
	mercadolibre: string | null
	tag_manager: string | null
	tidio_user: string | null
	pixel_facebook: string | null
	facebook_pixel_metatag_1: string | null
	facebook_chat: string | null
	google_merchant: string | null
	addiAllySlug: string | null

	constructor(data: IStoreExternalApi) {
		this.tienda_id = data.tienda_id
		this.facebook = data.facebook
		this.analytics = data.analytics
		this.mercadolibre = data.mercadolibre
		this.tag_manager = data.tag_manager
		this.tidio_user = data.tidio_user
		this.pixel_facebook = data.pixel_facebook
		this.facebook_pixel_metatag_1 = data.facebook_pixel_metatag_1
		this.facebook_chat = data.facebook_chat
		this.google_merchant = data.google_merchant
		this.addiAllySlug = data.addiAllySlug
	}
}
