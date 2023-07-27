import { Response } from "express"

/**
 * @name HttpResponseType
 * @description Type for the http response handler function
 */
type HttpResponseType = {
	data: unknown
	message: string
	success: boolean
	statusCode: number
}

/**
 * @name handlerHttpResponse
 * @param res  Response object
 * @param data Data to be sent in the response
 * @description Function to handle the http response
 */
export const handlerHttpResponse = (res: Response, data: HttpResponseType) => {
	const { statusCode, success, message, data: responseData } = data
	res.status(statusCode).json({
		success,
		message,
		data: responseData
	})
}
