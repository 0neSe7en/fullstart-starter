import {
	applySnapshot, flow,
	Instance,
	types,
} from 'mobx-state-tree'
import api, { removeToken, setToken } from './api'
import { TodoStore } from "./todoStore"
import Router from "next/router"

export let store: IStore = null as any

const User = types.model({
	email: types.string,
	id: types.string,
})

const Store = types.model({
	currentUser: types.maybe(User),
	authToken: types.maybe(types.string),
	todos: TodoStore,
}).actions(self => {
	const updateToken = (token) => {
		self.authToken = token
		setToken(token)
	}

	const login = flow(function *login(email: string, password: string) {
		const res = yield api.post('/login', { email, password })
		if (res.data && res.data.isValid) {
			self.currentUser = res.data.user
			updateToken(res.data.token)
		}
		yield Router.push('/webapp')
	})

	const userProfile = flow(function *userProfile() {
		const res = yield api.get('/users')
		self.currentUser = {
			id: res.data.id,
			email: res.data.email,
		}
	})

	const logout = flow(function *logout() {
		removeToken()
		yield api.get('/logout')
		self.currentUser = undefined
		self.authToken = undefined
		Router.push('/login')
	})

	return { login, userProfile, logout, updateToken }
})

export interface IStore extends Instance<typeof Store> {}

const emptyDefaultStore = {
	todos: {}
}

export const initializeStore = (isServer, snapshot = null) => {
	if (isServer) {
		store = Store.create(emptyDefaultStore)
	}
	if ((store as any) === null) {
		store = Store.create(emptyDefaultStore)
	}
	if (snapshot) {
		applySnapshot(store, snapshot)
	}
	return store
}
