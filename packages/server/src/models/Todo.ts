import { Schema, model } from 'mongoose'
import { ITodoDoc } from "./types"

const todoSchema = new Schema({
	text: String,
	completed: { type: Boolean, default: false },
	author: { type: Schema.Types.ObjectId, ref: 'User', index: true }
}, {
	toJSON: { virtuals: true} ,
	timestamps: true,
})

export async function fetchByUserId(userId: string): Promise<ITodoDoc[]> {
	return Todo.find({author: userId})
}

export async function add(userId: string, text: string): Promise<ITodoDoc> {
	const todo = new Todo({
		text,
		author: userId,
		completed: false
	})
	return todo.save()
}

export const Todo = model<ITodoDoc>('Todo', todoSchema)
