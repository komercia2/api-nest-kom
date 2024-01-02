import { v4 as uuid } from "uuid"

export class UuidUtil {
	static get uuid(): string {
		return uuid()
	}
}
