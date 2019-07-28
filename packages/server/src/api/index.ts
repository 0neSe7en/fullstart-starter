import * as Router from 'koa-router'
import * as _ from 'lodash'
import * as jwt from 'jsonwebtoken'
import * as config from 'config'
import { createUser, verifyPassowrd } from "../models/User"
import { auth } from "../middlewares/auth"
import { add, fetchByUserId, Todo } from "../models/Todo"

const router = new Router()

router.get('/', (ctx) => {
	ctx.body = {
		message: 'hello-world'
	}
})

router.post('/login', async ctx => {
	const { isValid, user } = await verifyPassowrd(ctx.request.body.email, ctx.request.body.password)
	if (isValid && user) {
		const u = { email: user.email, id: user.id }
		const token = jwt.sign(u, config.get('auth.secret'))
		ctx.cookies.set(config.get('auth.cookieName'), token, {
			maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
		})
		ctx.body = { user: u, isValid, token }
	} else {
		ctx.status = 401
	}
})

router.get('/logout', async ctx => {
	ctx.cookies.set(config.get('auth.cookieName'), '')
	ctx.status = 200
})

router.put('/users', async (ctx) => {
	const userInfo: {email: string, password: string} = ctx.request.body
	const u = await createUser(userInfo.email, userInfo.password)
	ctx.body = _.pick(u.toJSON(), ['id', 'email'])
})

router.get('/users', auth(), async ctx => {
	ctx.body = ctx.state.user
})

router.put('/todos', auth(), async ctx => {
	const { text } = ctx.request.body
	const todo = await add(ctx.state.user.id, text)
	ctx.body= todo.toJSON()
})

router.get('/todos', auth(), async ctx => {
	ctx.body = await fetchByUserId(ctx.state.user.id)
})

router.post('/todos/:todoId', auth(), async ctx => {
	const todoId = ctx.query.todoId
	const todo = await Todo.findOne({id: todoId, author: ctx.state.user.id})
	if (!todo) {
		ctx.status = 404
		return
	}
	const { text, completed } = ctx.request.body
	if (text !== undefined) {
		todo.text = text
	}
	if (completed !== undefined) {
		todo.completed = !!completed
	}
	if (_.isEmpty(completed)) {
		ctx.body = todo.toJSON()
	} else {
		await todo.save()
		ctx.body = todo.toJSON()
	}
})


export default router
