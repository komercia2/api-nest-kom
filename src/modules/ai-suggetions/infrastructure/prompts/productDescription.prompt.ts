export const productDescriptionPrompt = (
	productName: string,
	keyWords: string[],
	language: string,
	nWords?: number
) => {
	return `Actúa como un experto en marketing y ventas. Redacta una unica descripción corta en lenguaje ${language}, llamativa 
    y creativa de máximo ${nWords} palabras para un producto llamado ${productName}. Elige las palabras clave
    de la siguiente lista para resaltar los atributos únicos del producto: ${keyWords.join(", ")}.
    Asegúrate de captar la atención y despertar el interés de los clientes potenciales con una descripción 
    convincente y atractiva que destaque los beneficios y la propuesta de valor del producto.`
}
