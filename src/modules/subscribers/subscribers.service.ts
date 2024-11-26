import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Parser } from "json2csv"
import { SuscriptoresTienda } from "src/entities"
import { Repository } from "typeorm"

import { ExportType } from "./enums/export-type"

@Injectable()
export class SubscribersService {
	constructor(
		@InjectRepository(SuscriptoresTienda)
		private subscribersRepository: Repository<SuscriptoresTienda>
	) {}

	async export(
		id: number,
		type: ExportType
	): Promise<{ data: string | Buffer | undefined; filename: string }> {
		try {
			const data = await this.subscribersRepository.find({
				where: { idTienda: id },
				select: { email: true, createdAt: true },
				order: { createdAt: "DESC" }
			})

			if (type === ExportType.CSV) {
				const parsedData = data.map(({ email, createdAt }) => ({
					email,
					fecha: createdAt.toISOString().split("T")[0]
				}))

				const fields = ["email", "fecha"]
				const csv = new Parser({ fields }).parse(parsedData)

				return { data: csv, filename: "subscribers.csv" }
			}

			return { data: "", filename: "" }
		} catch (error) {
			console.error(error)
			throw new InternalServerErrorException("Error exporting subscribers in format: " + type)
		}
	}

	async findAll(id: number) {
		return this.subscribersRepository.find({ where: { idTienda: id } })
	}
}
