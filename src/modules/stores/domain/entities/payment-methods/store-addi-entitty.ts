export class StoreAddiEntity {
	constructor(
		readonly storeId: number,
		readonly clientID: string,
		readonly clientSecret: string,
		readonly ally_slug: string,
		readonly createdAt = new Date(),
		readonly updatedAt: Date | null,
		readonly deletedAt: Date | null
	) {
		this.storeId = storeId
		this.clientID = clientID
		this.clientSecret = clientSecret
		this.ally_slug = ally_slug
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.deletedAt = deletedAt
	}
}
