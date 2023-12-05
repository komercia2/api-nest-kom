/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseGuards } from "@nestjs/common"
import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from "@nestjs/websockets"
import { LaravelWsAuthGuard } from "@shared/infrastructure/guards/laravel-ws-auth-guard"
import { socketIOMiddleware } from "@shared/infrastructure/middlewares/auth/ws-auth-middleware"
import { Logger } from "nestjs-pino"
import { Server, Socket } from "socket.io"

enum MercadoPagoPaymentNotificationGatewayEvents {
	MERCADOPAGO_PAYMENT_NOTIFICATION = "MERCADOPAGO_PAYMENT_NOTIFICATION",
	MERCADOPAGO_PREFERENCE_CREATED = "MERCADOPAGO_PREFERENCE_CREATED"
}

@WebSocketGateway(81, {
	cors: "*",
	namespace: "payments/mercadopago/notifications",
	transports: ["websocket"]
})
@UseGuards(LaravelWsAuthGuard)
export class MercadoPagoPaymentNotificationGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	constructor(private readonly logger: Logger) {}

	@WebSocketServer() server: Server

	private readonly LOG_PREFIX = "MercadoPagoPaymentNotificationGateway"
	private readonly ROOM_PREFIX = "mercadopago-payment-notification"

	afterInit(client: Socket) {
		client.use(socketIOMiddleware() as any)
		this.logger.log(`${this.LOG_PREFIX} initialized`)
	}

	async handleConnection(client: Socket) {
		this.logger.log(`${this.LOG_PREFIX} client connected: ${client.handshake.auth.id}`)
		const { id } = client.handshake.auth
		await client.join(`${this.ROOM_PREFIX}-${id}`)
		this.logger.log(`${this.LOG_PREFIX} client joined to room: ${this.ROOM_PREFIX}-${id}`)
	}

	handleDisconnect(client: Socket) {
		console.log(`${this.LOG_PREFIX} client disconnected: ${client.id}`)
	}

	sendPaymentNotificationToStore(storeID: number, data: string) {
		this.server
			.to(`${this.ROOM_PREFIX}-${storeID}`)
			.emit(MercadoPagoPaymentNotificationGatewayEvents.MERCADOPAGO_PAYMENT_NOTIFICATION, data)
		this.logger.log(`${this.LOG_PREFIX} sent notification to store ${storeID}: ${data}`)
	}

	sendPreferenceCreatedToStore(storeID: number, data: string) {
		this.server
			.to(`${this.ROOM_PREFIX}-${storeID}`)
			.emit(MercadoPagoPaymentNotificationGatewayEvents.MERCADOPAGO_PREFERENCE_CREATED, data)
		this.logger.log(`${this.LOG_PREFIX} sent preference created to store ${storeID}: ${data}`)
	}

	@SubscribeMessage(MercadoPagoPaymentNotificationGatewayEvents.MERCADOPAGO_PAYMENT_NOTIFICATION)
	handleNotification(@MessageBody() data: string) {
		this.logger.log(`${this.LOG_PREFIX} received notification: ${data}`)
	}

	@SubscribeMessage(MercadoPagoPaymentNotificationGatewayEvents.MERCADOPAGO_PREFERENCE_CREATED)
	handlePreferenceCreated(@MessageBody() data: string) {
		this.logger.log(`${this.LOG_PREFIX} received preference created: ${data}`)
	}
}
