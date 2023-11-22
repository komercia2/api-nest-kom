import { Injectable } from "@nestjs/common"
import { read, utils } from "xlsx"

export interface IFileProduct {
	nombre: string
	precio_sin_variantes: number
	unidades: number
	sku: string
	peso: string
	garantia: string
	marca: string
	envio_gratis: boolean
	descripcion: string
	video_youtube: string
}

@Injectable()
export class XlsxProductService {
	async createFromFile(file: Express.Multer.File) {
		const { buffer } = file

		const workbook = read(buffer, { type: "buffer" })
		const sheetName = workbook.SheetNames[0]
		const sheet = workbook.Sheets[sheetName]
		const data: IFileProduct[] = utils.sheet_to_json(sheet)
		return data
	}
}
