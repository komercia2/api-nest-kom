interface ITemplate5Entity {
	id: string
	banner: string | null
	colorIcon: string | null
	colorBackgroundBtn: string | null
	tiendasId: number
	createdAt: Date | null
	updatedAt: Date | null
	backgroundColor_1: string | null
	backgroundColor_2: string | null
	bannerFooter: string | null
	tipoLetra: string | null
	colorText: string | null
	colorSubtext: string | null
	colorTextBtn: string | null
	iframe: string | null
	colorBorder: string | null
}

export class Template5Entity implements ITemplate5Entity {
	id: string
	banner: string | null
	colorIcon: string | null
	colorBackgroundBtn: string | null
	tiendasId: number
	createdAt: Date | null
	updatedAt: Date | null
	backgroundColor_1: string | null
	backgroundColor_2: string | null
	bannerFooter: string | null
	tipoLetra: string | null
	colorText: string | null
	colorSubtext: string | null
	colorTextBtn: string | null
	iframe: string | null
	colorBorder: string | null

	constructor(data: ITemplate5Entity) {
		this.id = data.id
		this.banner = data.banner
		this.colorIcon = data.colorIcon
		this.colorBackgroundBtn = data.colorBackgroundBtn
		this.tiendasId = data.tiendasId
		this.createdAt = data.createdAt
		this.updatedAt = data.updatedAt
		this.backgroundColor_1 = data.backgroundColor_1
		this.backgroundColor_2 = data.backgroundColor_2
		this.bannerFooter = data.bannerFooter
		this.tipoLetra = data.tipoLetra
		this.colorText = data.colorText
		this.colorSubtext = data.colorSubtext
		this.colorTextBtn = data.colorTextBtn
		this.iframe = data.iframe
		this.colorBorder = data.colorBorder
	}
}
