import { Controller, Get, Param, Query, Res } from "@nestjs/common"
import { Response } from "express"

import { ExportType } from "./enums/export-type"
import { SubscribersService } from "./subscribers.service"

@Controller()
export class SubscribersController {
	constructor(private readonly subscribersService: SubscribersService) {}

	@Get(":id/export")
	async export(@Res() res: Response, @Param("id") id: string, @Query("type") type: ExportType) {
		const { data, filename } = await this.subscribersService.export(+id, type)

		res.attachment(filename)
		res.send(data)

		return res
	}

	@Get(":id")
	findAll(@Param("id") id: string) {
		return this.subscribersService.findAll(+id)
	}
}
