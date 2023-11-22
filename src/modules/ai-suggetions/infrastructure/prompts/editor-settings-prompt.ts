import { getEditorSettingSuggestionsDTO } from "../../application/query/dtos"

export const editorSettingsPrompt = (input: getEditorSettingSuggestionsDTO) => {
	const { inputSetting, keyWords, theme, improveAllTexts } = input
	return `Actúa como un experto en experiencia de usuario y diseño. 
    A partir del siguiente texto que se encuentra en formato JSON: ${inputSetting} que
    corresponde a la configuración de una tienda en línea, genera una configuración
    siguiendo las mejores prácticas de diseño y experiencia de usuario.
    Sigue el mismo formato original del JSON para la configuración de la tienda en línea.
    Modifica los colores, tipografías, tamaños, etc. de los elementos de la tienda en línea.
    Ten en cuenta las siguientes consideraciones:
    ${
			improveAllTexts
				? `Además, mejora todos los textos de la tienda en línea. Usando un lenguaje más persuasivo y convincente.`
				: ""
		}
    ${keyWords.length > 0 ? `Utiliza las siguientes palabras clave: ${keyWords.join(", ")}.` : ""}
    ${theme ? `El tema de la tienda en línea es: ${theme}.` : ""}
    Devuelve el JSON de la configuración de la tienda en línea.`
}
