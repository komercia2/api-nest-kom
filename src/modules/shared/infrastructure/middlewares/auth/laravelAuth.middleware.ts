import { HttpStatus, Injectable, NestMiddleware, Req } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import axios from "axios"
import { NextFunction, Request, Response } from "express"

@Injectable()
export class LaravelAuthMiddleware implements NestMiddleware {
	async use(@Req() req: Request, res: Response, next: NextFunction) {
		try {
			verifytokenLaravel(req)
				.then((resolve) => {
					req.id = resolve.id
					next()
				})
				.catch((reject) => {
					handlerHttpResponse(res, {
						statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
						data: null,
						success: false,
						message: reject.error
					})
				})
		} catch (error) {
			handlerHttpResponse(res, {
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				data: null,
				success: false,
				message: "Error validating token from Laravel"
			})
		}
	}
}

const verifytokenLaravel = (req: Request) => {
	const requestURL = `${process.env.API_KOMERCIA}/api/user`
	const token = req.headers.authorization
	const config = {
		headers: {
			Authorization: token
		}
	}

	return new Promise<IAuth>((resolve, reject) => {
		if (!token) reject({ error: "Token not found" })

		axios
			.get<ILaravelAuthResponse>(requestURL, config)
			.then(({ data }) => {
				return data.data
			})
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

interface ILaravelAuthData {
	id: number
	errores: {
		codigo: string
		mensaje: string
	}
	tienda: {
		id: number
		fecha_expiracion: Date
	}
}

export interface IAuth {
	id: number
}

export interface ILaravelAuthResponse {
	data: ILaravelAuthData
}
