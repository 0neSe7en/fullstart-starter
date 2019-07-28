import React from 'react'
import { inject, observer } from "mobx-react"
import { IStore, store } from "../src/models/store"
import { Button } from "@blueprintjs/core"
import Router from "next/router"
import { withAuth } from "../src/withAuth"

@inject('store')
@observer
class Webapp extends React.Component<{store: IStore}> {
	static async getInitialProps(ctx) {
		await store.todos.fetch()
	}

	render() {
		const { store } = this.props
		if (!store.currentUser) {
			Router.push('/login')
			return null
		}
		return (
			<>
				User Login as: {store.currentUser.email}, id is {store.currentUser.id}
				<Button onClick={store.logout}>Logout</Button>
				{
					store.todos.filteredTodos.map(todo => (
						<p>Todo: {todo.text}</p>
					))
				}
			</>
		)
	}
}

export default withAuth(Webapp)
