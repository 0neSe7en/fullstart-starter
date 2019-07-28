import { types, getRoot, destroy, Instance, flow } from 'mobx-state-tree'
import api from './api'

export enum TodoStatus {
	SHOW_ALL = 'show_all',
	SHOW_COMPLETED = 'show_completed',
	SHOW_ACTIVE = 'show_active',
}

const TODO_FILTERS = {
	[TodoStatus.SHOW_ALL]: () => true,
	[TodoStatus.SHOW_ACTIVE]: todo => !todo.completed,
	[TodoStatus.SHOW_COMPLETED]: todo => todo.completed
}

const Todo = types
	.model({
		text: types.string,
		completed: false,
		id: types.identifier,
	})
	.actions(self => ({
		remove() {
			getRoot(self).removeTodo(self)
		},
		edit(text) {
			self.text = text
		},
		complete() {
			self.completed = !self.completed
		}
	}))

interface ITodo extends Instance<typeof Todo> {}

export const TodoStore = types.model({
	todos: types.optional(types.array(Todo), []),
	filter: types.optional(types.enumeration<TodoStatus>(Object.values(TodoStatus)), TodoStatus.SHOW_ALL)
}).views(self => ({
	get completedCount() {
		return self.todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
	},
	get filteredTodos() {
		return self.todos.filter(TODO_FILTERS[self.filter])
	}
})).views(self => ({
	get activeCount() {
		return self.todos.length - self.completedCount
	},
})).actions(self => ({
	removeTodo(todo) {
		destroy(todo)
	},
	completeAll() {
		const areAllMarked = self.todos.every(todo => todo.completed)
		self.todos.forEach(todo => (todo.completed = !areAllMarked))
	},
	clearCompleted() {
		self.todos.replace(self.todos.filter(todo => todo.completed === false))
	},
	setFilter(filter) {
		self.filter = filter
	}
})).actions(self => {
	const fetch = flow(function *fetch() {
		const res = yield api.get('/todos')
		if (res.data) {
			self.todos = res.data
		}
	})

	const add = flow(function *add(text: string) {
		const todo = yield api.put('/todos', { text })
		self.todos.unshift(todo)
	})
	return { fetch, add }
})

export interface ITodoStore extends Instance<typeof TodoStore> {}

