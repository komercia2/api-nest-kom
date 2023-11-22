import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { CustomerAccessCode } from "src/entities"
import { Repository } from "typeorm"

@Injectable()
export class MySQLStoreCustomerAccessCodeService {
	constructor(
		@InjectRepository(CustomerAccessCode)
		private readonly customerAccessCodeRepository: Repository<CustomerAccessCode>
	) {}

	async checkWithoutAuth(storeId: number, accessCode: string): Promise<boolean> {
		const result = await this.customerAccessCodeRepository.findOne({
			where: { tiendasId: storeId, accessCode, status: true }
		})

		return !!result
	}
}
