import { Inject } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { MercadoPagoConfig, Payment } from "mercadopago"

import { MercadopagoPreferenceEntity } from "../../domain/entities"
import { IMercadopagoRepository } from "../../domain/repositories"
import { MySQLMercadopagoService } from "../services"

export class MercadopagoRepository implements IMercadopagoRepository {
	private readonly mercadopagoConfig: MercadoPagoConfig = {
		accessToken: this.configService.get<string>("MERCADOPAGO_ACCESS_TOKEN") as string,
		options: { timeout: 10000 }
	}

	private readonly payment = new Payment(this.mercadopagoConfig)

	constructor(
		@Inject(MySQLMercadopagoService)
		private readonly mercadopagoService: MySQLMercadopagoService,

		@Inject(ConfigService) private readonly configService: ConfigService
	) {}
	createPreference(cartId: number): Promise<MercadopagoPreferenceEntity> {
		throw new Error("Method not implemented.")
	}
}
