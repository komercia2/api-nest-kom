export const checkSpecialCharacters = (value: string) => {
	const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
	return regex.test(value)
}
