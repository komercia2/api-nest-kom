import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Users } from "src/entities"
import { Repository } from "typeorm"

@Injectable()
export class MySQLUserService {
	constructor(@InjectRepository(Users) private readonly userRepository: Repository<Users>) {}

	async updateRole(userId: string, role: number): Promise<void> {
		await this.userRepository.update(userId, { rol: role })
	}
}
