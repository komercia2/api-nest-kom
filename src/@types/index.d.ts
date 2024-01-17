import * as express from "express"

declare global {
	namespace Express {
		interface Request {
			id: number
			checkoutUser: {
				userId: number
			}
			superUser: {
				id: number
				email: string
			}
		}
	}
}
