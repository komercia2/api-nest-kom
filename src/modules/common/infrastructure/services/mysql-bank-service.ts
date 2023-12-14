import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Bancos } from "src/entities"
import { Repository } from "typeorm"

import { BankEntity } from "../../domain/entities"

@Injectable()
export class MySQLBankService {
	constructor(
		@InjectRepository(Bancos)
		private readonly bankRepository: Repository<Bancos>
	) {}

	async getByCountryId(countryId: number) {
		const banks = await this.bankRepository.find({ where: { paisesId: countryId } })
		return banks.map((bank) => this.toEntity(bank))
	}

	private toEntity(bank: Bancos): BankEntity {
		return BankEntity.create({
			id: bank.id,
			nombre: bank.nombre,
			imagen: bank.imagen,
			paises_id: bank.paisesId,
			created_at: bank.createdAt,
			updated_at: bank.updatedAt
		})
	}
}
