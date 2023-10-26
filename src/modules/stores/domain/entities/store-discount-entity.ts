interface IStoreDiscount {
	id: string
	name: string | null
	discountPercentage: number | null
	discountValue: number | null
	productsAmount: number | null
	storeId: number
	createdAt: Date | null
	upadatedAt: Date | null
	type: number
	priceRanges: string | null
	option: number
	status: boolean
}

export class StoreDiscountEntity implements IStoreDiscount {
	id: string
	name: string | null
	discountPercentage: number | null
	discountValue: number | null
	productsAmount: number | null
	storeId: number
	createdAt: Date | null
	upadatedAt: Date | null
	type: number
	priceRanges: string | null
	option: number
	status: boolean

	constructor(storeDiscount: IStoreDiscount) {
		this.id = storeDiscount.id
		this.name = storeDiscount.name
		this.discountPercentage = storeDiscount.discountPercentage
		this.discountValue = storeDiscount.discountValue
		this.productsAmount = storeDiscount.productsAmount
		this.storeId = storeDiscount.storeId
		this.createdAt = storeDiscount.createdAt
		this.upadatedAt = storeDiscount.upadatedAt
		this.type = storeDiscount.type
		this.priceRanges = storeDiscount.priceRanges
		this.option = storeDiscount.option
		this.status = storeDiscount.status
	}
}
