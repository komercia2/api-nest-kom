import axios from "axios"

export async function getExternalTemplateSettings<T extends { id: number }>(
	templateNumber: number,
	demoId: number | string
) {
	const URL = `http://167.172.246.199/template${templateNumber}?id=${demoId}`

	const response = await axios.get<T>(URL)
	const { data } = response

	if (!data) return null

	const template = data as unknown as { body: T }

	const { body } = template

	return body
}
