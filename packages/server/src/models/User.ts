import { Schema, model } from 'mongoose'
import { IUserDoc } from "./types"
import { createHash } from 'crypto';

const nanoid = require('nanoid')

const userSchema = new Schema({
	salt: String,
	email: { type: String, unique: true, required: true, sparse: true },
	password: { type: String, required: true },
}, {
	toJSON: { virtuals: true },
	timestamps: true,
})

function _sha512Encrypt(password: string, salt: string) {
	let shasum = createHash('sha512')
	shasum.update(salt)
	shasum.update(password)
	let hv = shasum.digest()
	for (let i = 0; i < 512; i += 1) {
		shasum = createHash('sha512')
		shasum.update(hv)
		hv = shasum.digest()
	}
	return Buffer.from(hv).toString('base64')
}

export async function createUser(email: string, password: string): Promise<IUserDoc> {
	const salt = nanoid(32)
	const u = new User({
		salt,
		email,
		password: _sha512Encrypt(password, salt)
	})
	return u.save()
}

export async function verifyPassowrd(email: string, passwordInput: string): Promise<boolean> {
	const u = await User.findOne({email})
	if (u) {
		const p = _sha512Encrypt(passwordInput, u.salt)
		return p === passwordInput
	} else {
		return false
	}
}

export const User = model<IUserDoc>('User', userSchema)
