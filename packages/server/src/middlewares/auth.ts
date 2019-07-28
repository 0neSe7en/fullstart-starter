import { Middleware } from "koa"
import * as jwt from 'koa-jwt'
import * as config from 'config'

export function auth(): Middleware {
	return jwt({
		secret: config.get('auth.secret'),
		cookie: config.get('auth.cookieName')
	})
}
