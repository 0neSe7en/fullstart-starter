import * as Router from 'koa-router'
import * as _ from 'lodash'
import { createUser, verifyPassowrd } from "../models/User"

const router = new Router()

router.get('/', (ctx) => {
	ctx.body = {
		message: 'hello-world'
	}
})

router.post('/login', async ctx => {
	return ctx.body = {
		success: await verifyPassowrd(ctx.request.body.email, ctx.request.body.password)
	}
})

router.put('/users', async (ctx) => {
	const userInfo: {email: string, password: string} = ctx.request.body
	const u = await createUser(userInfo.email, userInfo.password)
	ctx.body = _.pick(u, ['id', 'email'])
})

export default router
