import { HttpStatus, Inject, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"

import { CreateFromFileCommand } from "../../application/command"
import { InfrastructureInjectionTokens } from "../infrastructure-injection-tokens"

@ApiTags("Products")
@Controller("")
export class AdminProductController {
	constructor(
		@Inject(InfrastructureInjectionTokens.CreateFromFileCommand)
		private readonly createFromFileCommand: CreateFromFileCommand
	) {}

	@Post("admin/import")
	@UseInterceptors(
		FileInterceptor("file", {
			limits: {
				fieldNameSize: 255,
				fileSize: 1024 * 1024 * 5,
				files: 1
			},
			fileFilter: (req, file, cb) => {
				if (!file.originalname.match(/\.(csv|xlsx)$/)) {
					return cb(new Error("Only csv and xlsx files are allowed!"), false)
				}
				cb(null, true)
			}
		})
	)
	async importProducts(
		@UploadedFile() file: Express.Multer.File,
		@Req() req: Request,
		@Res() res: Response
	) {
		try {
			const { id } = req
			await this.createFromFileCommand.execute(Number(id), file)

			handlerHttpResponse(res, {
				data: null,
				message: "Products imported",
				statusCode: HttpStatus.OK,
				success: true
			})
			return
		} catch (error) {
			console.log(error)
			handlerHttpResponse(res, {
				data: null,
				message: "Error importing products",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
