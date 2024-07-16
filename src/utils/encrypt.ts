import BcryptReactNative from 'react-native-bcrypt'

const SALT_ROUNDS = 10

export async function encrypt(rawStr: string) {
	return new Promise<string>((resolve, reject) => {
		BcryptReactNative.genSalt(SALT_ROUNDS, (error, slat) => {
			if (slat) {
				BcryptReactNative.hash(rawStr, slat, (err, hash) => {
					resolve(hash!)
				})
			}
		})
	})
	// const salt = BcryptReactNative.genSaltSync(SALT_ROUNDS)
	// return BcryptReactNative.hashSync(rawStr, salt)
}
