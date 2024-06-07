interface ITemplate12Entity {
	_id: string
	desktopBanner: string | null
	responsiveBanner: string | null
	bannerFilterOpacity: number | null
	fontFamily: string | null
	roundedImages: boolean | null
	responsiveImages: boolean | null
	titleColor: string | null
	textColor: string | null
	priceColor: string | null
	logoSize: string | null
	backgroundColor: string | null
	footerText: string | null
	descriptionColor: string | null
	backgroundFooter: string | null
	bannerTitle: string | null
	bannerDescription: string | null
	bannerTitleColor: string | null
	bannerDescriptionColor: string | null
	footerTitle: string | null
}

export class Template12Entity implements ITemplate12Entity {
	_id: string
	desktopBanner: string | null
	responsiveBanner: string | null
	bannerFilterOpacity: number | null
	fontFamily: string | null
	roundedImages: boolean | null
	responsiveImages: boolean | null
	titleColor: string | null
	textColor: string | null
	priceColor: string | null
	logoSize: string | null
	backgroundColor: string | null
	footerText: string | null
	descriptionColor: string | null
	backgroundFooter: string | null
	bannerTitle: string | null
	bannerDescription: string | null
	bannerTitleColor: string | null
	bannerDescriptionColor: string | null
	footerTitle: string | null

	constructor(data: ITemplate12Entity) {
		this._id = data._id
		this.desktopBanner = data.desktopBanner
		this.responsiveBanner = data.responsiveBanner
		this.bannerFilterOpacity = data.bannerFilterOpacity
		this.fontFamily = data.fontFamily
		this.roundedImages = data.roundedImages
		this.responsiveImages = data.responsiveImages
		this.titleColor = data.titleColor
		this.textColor = data.textColor
		this.priceColor = data.priceColor
		this.logoSize = data.logoSize
		this.backgroundColor = data.backgroundColor
		this.footerText = data.footerText
		this.descriptionColor = data.descriptionColor
		this.backgroundFooter = data.backgroundFooter
		this.bannerTitle = data.bannerTitle
		this.bannerDescription = data.bannerDescription
		this.bannerTitleColor = data.bannerTitleColor
		this.bannerDescriptionColor = data.bannerDescriptionColor
		this.footerTitle = data.footerTitle
	}
}
