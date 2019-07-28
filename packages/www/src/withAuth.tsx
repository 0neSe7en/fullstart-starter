import React from "react"
import nextCookie from 'next-cookies'
import { CookieName } from "./consts"
import Router from "next/router"
import { store } from "./models/store"
import { setToken } from "./models/api"

const getDisplayName = Component =>
	Component.displayName || Component.name || 'Component'

function auth(ctx) {
	if (store && store.authToken) {
		return store.authToken
	}
	const cookie = nextCookie(ctx)
	if (ctx.req && !cookie[CookieName]) {
		ctx.res.writeHead(302, { Location: '/login' })
		ctx.res.end()
		return
	}
	if (!cookie[CookieName]) {
		Router.push('/login')
	}
	return cookie[CookieName]
}

export const withAuth = WrappedComponent =>
	class extends React.Component {
		static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`
		static async getInitialProps (ctx) {
			const token = auth(ctx)
			setToken(token)

			if (token) {
				try {
					await store.userProfile()
				} catch (e) {
					console.error('error happened', e.message)
				}
			}

			const componentProps =
				WrappedComponent.getInitialProps &&
				(await WrappedComponent.getInitialProps(ctx))

			return { ...componentProps, token }
		}

		render() {
			return <WrappedComponent {...this.props} />
		}
	}

