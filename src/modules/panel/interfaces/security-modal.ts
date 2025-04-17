export interface ISecurityModal {
	id: string
	title: string
	description: string
	img: string
	password: string
	color_title: string
	color_description: string
	font_weigh_title: string
	font_size_title: string
	font_weigh_description: string
	font_size_description: string
	width_img: string
	color_text_btn: string
	color_bg_btn: string
	color_border: string
	color_bg_1: string
	color_bg_2: string
	state_modal: boolean
	tiendas_id: number
	created_at: Date | null
	updated_at: Date | null
}
