import {
	applySnapshot, flow,
	Instance,
	SnapshotIn,
	SnapshotOut,
	types,
} from 'mobx-state-tree'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/api'

let store: IStore = null as any

const User = types.model({
	email: types.string
})


const Store = types
	.model({
		foo: types.number,
		lastUpdate: types.Date,
		light: false,
		user: types.maybe(User),
	})
	.actions(self => {
		const login = flow(function *login(email: string, password: string) {
			const res = yield axios.post('/login', { email, password })
			console.log('login success?', res.data)
			return res.data
		})


		let timer
		const start = () => {
			timer = setInterval(() => {
				// mobx-state-tree doesn't allow anonymous callbacks changing data.
				// Pass off to another action instead (need to cast self as any
				// because typescript doesn't yet know about the actions we're
				// adding to self here)
				(self as any).update()
			}, 1000)
		}
		const update = () => {
			self.lastUpdate = new Date(Date.now())
			self.light = true
		}
		const stop = () => {
			clearInterval(timer)
		}
		return { start, stop, update, login }
	})

export type IStore = Instance<typeof Store>
export type IStoreSnapshotIn = SnapshotIn<typeof Store>
export type IStoreSnapshotOut = SnapshotOut<typeof Store>

export const initializeStore = (isServer, snapshot = null) => {
	if (isServer) {
		store = Store.create({ foo: 6, lastUpdate: Date.now(), light: false })
	}
	if ((store as any) === null) {
		store = Store.create({ foo: 6, lastUpdate: Date.now(), light: false })
	}
	if (snapshot) {
		applySnapshot(store, snapshot)
	}
	return store
}
