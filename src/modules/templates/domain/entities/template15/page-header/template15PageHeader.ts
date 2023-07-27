import { pageHeaderSettings } from "./template15PageHeader.settings"
import { Template15PageHeaderValues } from "./template15PageHeaderValues"

export class Template15PageHeader {
	values: Template15PageHeaderValues[]

	constructor(values: Template15PageHeaderValues[] = pageHeaderSettings) {
		this.values = values
	}

	toPrimitive = () => {
		return this.values.map((value) => ({ ...value }))
	}
}
