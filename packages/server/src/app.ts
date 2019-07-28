import * as Koa from 'koa'
import * as kBodyParser from 'koa-bodyparser'
import * as morgan from 'koa-morgan'
import routes from './routes'
import './models'

const cors = require('@koa/cors')
const app = new Koa()

app
	.use(kBodyParser())
	.use(async (ctx, next) => {
	const server = ctx.server
    if (
      server &&
      server.keepAliveTimeout &&
      server.keepAliveTimeout >= 1000 &&
      ctx.header.connection !== 'close'
    ) {
      const timeout = parseInt((server.keepAliveTimeout / 1000).toString())
      ctx.set('keep-alive', `timeout=${timeout}`)
    }
    return next()
  })
	.use(cors({ credentials: true }))
	.use(morgan(`:method :status :response-time :url`))
	.use(routes.routes())

export default app
