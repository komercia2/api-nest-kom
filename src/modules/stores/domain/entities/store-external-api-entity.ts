interface IStoreExternalApi {
	storeId: number
	facebook: string | null
	analytics: string | null
	mercadolibre: string | null
	tagManager: string | null
	tidioUser: string | null
	pixelFacebook: string | null
	facebookPixelMetatag1: string | null
	facebookChat: string | null
	googleMerchant: string | null
}

export class StoreExternalApi implements IStoreExternalApi {
	storeId: number
	facebook: string | null
	analytics: string | null
	mercadolibre: string | null
	tagManager: string | null
	tidioUser: string | null
	pixelFacebook: string | null
	facebookPixelMetatag1: string | null
	facebookChat: string | null
	googleMerchant: string | null

	constructor(data: IStoreExternalApi) {
		this.storeId = data.storeId
		this.facebook = data.facebook
		this.analytics = data.analytics
		this.mercadolibre = data.mercadolibre
		this.tagManager = data.tagManager
		this.tidioUser = data.tidioUser
		this.pixelFacebook = data.pixelFacebook
		this.facebookPixelMetatag1 = data.facebookPixelMetatag1
		this.facebookChat = data.facebookChat
		this.googleMerchant = data.googleMerchant
	}
}
