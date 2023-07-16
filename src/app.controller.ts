import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"

/**
 * @name AppController
 * @description Controller for the home route of the application
 */
@ApiTags("Home")
@Controller()
export class AppController {
	@Get("/")
	getHome(@Req() _req: Request, @Res() res: Response) {
		handlerHttpResponse(res, {
			data: null,
			message: "API is running successfully! 🚀🍺🍻",
			success: true,
			statusCode: HttpStatus.OK
		})
	}
}
