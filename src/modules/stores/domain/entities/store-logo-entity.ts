export class StoreLogoEntity {
	identifier: string
	logo: string
	logoMigrated: boolean

	constructor(identifier: string, logo: string, logoMigrated: boolean) {
		this.identifier = identifier
		this.logo = logo
		this.logoMigrated = logoMigrated
	}

	static create(identifier: string, logo: string, logoMigrated: boolean): StoreLogoEntity {
		return new StoreLogoEntity(identifier, logo, logoMigrated)
	}
}
