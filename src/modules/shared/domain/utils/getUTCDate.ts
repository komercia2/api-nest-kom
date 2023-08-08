export const getUTCDate = () => {
	const date = new Date()
	const year = date.getFullYear().toString()
	const month = date.getUTCMonth() + 1
	const day = date.getUTCDate().toString()
	const hour = date.getUTCHours().toString()
	const minutes = date.getUTCMinutes().toString()
	const seconds = date.getUTCSeconds()
	const currentDate = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`
	return currentDate
}
