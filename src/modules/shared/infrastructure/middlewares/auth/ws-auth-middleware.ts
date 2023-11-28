import { LaravelWsAuthGuard } from "@shared/infrastructure/guards/laravel-ws-auth-guard"
import { Socket } from "socket.io"

export type SocketIOMiddleware = {
	(client: Socket, next: (err?: Error) => void): void
}

export const socketIOMiddleware = () => {
	return (client: Socket, next: (err?: Error) => void) => {
		try {
			LaravelWsAuthGuard.verifytokenLaravel(client)
				.then((resolve) => {
					client.handshake.auth = resolve
					next()
				})
				.catch(() => next(new Error("Unauthorized")))
		} catch (error) {
			next(new Error("Unauthorized"))
		}
	}
}
