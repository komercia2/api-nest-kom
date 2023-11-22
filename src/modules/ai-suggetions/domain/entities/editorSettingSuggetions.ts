export class EditorSettingSuggetions {
	constructor(
		public readonly inputSetting: object,
		public readonly storeId: number,
		public readonly theme: string,
		public readonly finalSetting: object
	) {}
}
