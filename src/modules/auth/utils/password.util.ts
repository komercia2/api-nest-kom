import { compare, hashSync } from "bcrypt"

export class PasswordUtil {
	static compare(password: string, hash: string) {
		if (this.isLaravelHash(hash)) {
			return compare(password, this.laravelHashToBcrypt(hash))
		}
		return compare(password, hash)
	}

	static hash(password: string) {
		return hashSync(password, 10)
	}

	static toLaravelHash(bcryptHash: string) {
		return bcryptHash.replace(/^\$2a(.+)$/i, "$2y$1")
	}

	static isLaravelHash(hash: string) {
		return /^\$2y(.+)$/i.test(hash)
	}

	static laravelHashToBcrypt(laravelHash: string) {
		return laravelHash.replace(/^\$2y(.+)$/i, "$2a$1")
	}
}
