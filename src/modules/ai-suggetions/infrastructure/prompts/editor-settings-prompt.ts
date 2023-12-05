import { getEditorSettingSuggestionsDTO } from "../../application/query/dtos"

export const editorSettingsPrompt = (input: getEditorSettingSuggestionsDTO) => {
	const { inputSetting, keyWords, theme } = input
	const prompt = `As a seasoned frontend developer and graphic designer, I'm currently immersed in a captivating project – a website theme transformation for our esteemed client. The chosen theme is ${theme}, but the pivotal aspect is ensuring a contrast tolerance of 4.5:1 or higher for accessibility.

  The specific settings that demand attention are: ${getSettingName(
		inputSetting
	)}. However, our focus extends beyond mere adjustment; we're committed to crafting a seamless blend of colors that resonates with the client's designated keywords: ${keyWords.join(
		", "
	)}.
  
  In pursuit of superior accessibility and color contrast, the color modifications will be made in hex format. The provided settings, outlined in ${JSON.stringify(
		inputSetting
	)}, will undergo a meticulous transformation. In cases where the settings are arrays, the entire structure will be preserved while adjusting individual values.
  
  The ultimate output will be a JSON configuration mirroring the input structure, albeit with the refined color palette intricately related to the specified keywords. This ensures not only a visually appealing theme but also a website that adheres to the highest standards of accessibility.`

	return prompt
}

const getSettingName = (setting: object) => Object.keys(setting)[0]
