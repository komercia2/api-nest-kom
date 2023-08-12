import { mongo } from "mongoose"

export const createObjectIdFromHexString = (id: string) => {
	return mongo.BSON.ObjectId.createFromHexString(id)
}
