import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Logger } from "nestjs-pino"
import * as Pusher from "pusher"

@Injectable()
export class PusherNotificationsService {
	private readonly pusherClient = new Pusher({
		appId: this.configService.get<string>("PUSHER_APP_ID") as string,
		key: this.configService.get<string>("PUSHER_APP_KEY") as string,
		secret: this.configService.get<string>("PUSHER_APP_SECRET") as string,
		cluster: this.configService.get<string>("PUSHER_APP_CLUSTER") as string,
		encrypted: true
	})

	private readonly LOGGER_CONTEXT = PusherNotificationsService.name

	constructor(private readonly configService: ConfigService, private readonly logger: Logger) {}

	async trigger<T>(channel: string, event: string, data: T) {
		try {
			await this.pusherClient.trigger(channel, event, data)
		} catch (error) {
			this.logger.error(error, this.LOGGER_CONTEXT)
		}
	}
}
