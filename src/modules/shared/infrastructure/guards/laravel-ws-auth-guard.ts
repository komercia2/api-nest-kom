import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import axios from "axios"
import { Observable } from "rxjs"
import { Socket } from "socket.io"

import { IAuth, ILaravelAuthResponse } from "../middlewares/auth"

@Injectable()
export class LaravelWsAuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		if (context.getType() !== "ws") {
			return true
		}

		const client: Socket = context.switchToWs().getClient()

		return LaravelWsAuthGuard.verifytokenLaravel(client)
			.then((resolve) => {
				client.handshake.auth = resolve
				return true
			})
			.catch(() => false)
	}

	static verifytokenLaravel = (client: Socket) => {
		const { authorization } = client.handshake.headers

		const requestURL = `${process.env.API_KOMERCIA}/api/user`
		const config = {
			headers: {
				Authorization: authorization
			}
		}
		return new Promise<IAuth>((resolve, reject) => {
			if (!authorization) reject({ error: "Token not found" })

			axios
				.get<ILaravelAuthResponse>(requestURL, config)
				.then(({ data }) => data.data)
				.then((result) => {
					if (result.errores) {
						reject({
							error: "Error vali: " + result.errores.mensaje
						})
						return
					}

					if (!result.tienda) {
						reject({
							error: "No se pudieron obtener los datos del api de usuarios"
						})

						return
					}
					const { fecha_expiracion, id } = result.tienda

					if (fecha_expiracion >= new Date()) {
						reject({
							error: "El token ha caducado"
						})
						return
					}
					resolve({ id })
				})
				.catch((error) => {
					reject({
						error: "Error al validar el token. Laravel response: " + error
					})
				})
		})
	}
}
