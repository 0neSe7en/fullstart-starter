import { Document } from "mongoose"

export interface ICommon {
	id: string
	_id: any
	createdAt: Date
	updatedAt: Date
}

export interface IUser extends ICommon {
	salt: string
	username: string
	email: string
	emailVerified: boolean
	password: string
	description?: string
	profile: {
		avatarImageUrl?: string
	}
}

export interface ITodo extends ICommon {
	text: string
	completed: boolean
	author: IUserDoc['id']
}

export interface IUserDoc extends Document, IUser { id: string }
export interface ITodoDoc extends Document, ITodo { id: string }
