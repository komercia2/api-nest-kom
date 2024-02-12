export interface CreateAddiApplicationDto {
	orderId: string
	totalAmount: string
	shippingAmount: string
	totalTaxesAmount: string
	currency: string
	items: Item[]
	client: Client
	shippingAddress: ShippingAddress
	billingAddress: BillingAddress
	pickUpAddress: PickUpAddress
	allyUrlRedirection: AllyUrlRedirection
	geoLocation: GeoLocation
}

export interface Item {
	sku: string
	name: string
	quantity: string
	unitPrice: number
	tax: number
	pictureUrl: string
	category: string
	brand: string
}

export interface Client {
	idType: string
	idNumber: string
	firstName: string
	lastName: string
	email: string
	cellphone: string
	cellphoneCountryCode: string
	address: Address
}

export interface Address {
	lineOne: string
	city: string
	country: string
}

export interface ShippingAddress {
	lineOne: string
	city: string
	country: string
}

export interface BillingAddress {
	lineOne: string
	city: string
	country: string
}

export interface PickUpAddress {
	lineOne: string
	city: string
	country: string
}

export interface AllyUrlRedirection {
	logoUrl: string
	callbackUrl: string
	redirectionUrl: string
}

export interface GeoLocation {
	latitude: string
	longitude: string
}
