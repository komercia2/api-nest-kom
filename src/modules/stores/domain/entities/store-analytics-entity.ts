import { CreateStoreAnalyticsDto } from "../dtos"

export enum StoreAnalyticsEvent {
	VISITED_PAGE = "VISITED_PAGE",
	CLICKED_CATEGORY = "CLICKED_CATEGORY",
	VISITED_PRODUCTS_PAGE = "VISITED_PRODUCTS_PAGE",
	VIEWED_PRODUCT = "VIEWED_PRODUCT",
	ADDED_PRODUCT_TO_CART = "ADDED_PRODUCT_TO_CART",
	CLICKED_PAY_CART = "CLICKED_PAY_CART"
}

interface IStoreAnalyticsEntity {
	id?: string
	storeId: number
	event: StoreAnalyticsEvent
	productId?: number
	categoryId?: number
	device?: string
	occuredAt: Date
}

export class StoreAnalyticsEntity implements IStoreAnalyticsEntity {
	id?: string
	storeId: number
	event: StoreAnalyticsEvent
	productId?: number
	categoryId?: number
	device?: string
	occuredAt: Date

	constructor(props: IStoreAnalyticsEntity) {
		this.id = props.id
		this.storeId = props.storeId
		this.event = props.event
		this.productId = props.productId
		this.categoryId = props.categoryId
		this.device = this.identifyDevice(props.device)
		this.occuredAt = new Date()
	}

	static create(dto: CreateStoreAnalyticsDto) {
		return new StoreAnalyticsEntity({
			...dto,
			occuredAt: new Date()
		})
	}

	private identifyDevice(userAgent?: string) {
		if (!userAgent) return "OTHER"

		const userAgentLowerCase = userAgent.toLowerCase()

		const mobileKeywords = ["mobile", "android", "iphone", "ipad"]
		const tabletKeywords = ["tablet", "ipad"]
		const desktopKeywords = ["windows", "macintosh", "linux", "cros"]

		if (mobileKeywords.some((keyword) => userAgentLowerCase.includes(keyword))) return "MOBILE"

		if (tabletKeywords.some((keyword) => userAgentLowerCase.includes(keyword))) return "TABLET"

		if (desktopKeywords.some((keyword) => userAgentLowerCase.includes(keyword))) return "DESKTOP"

		return "OTHER"
	}
}
