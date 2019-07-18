import * as Router  from 'koa-router'
import api from './api'

const router = new Router()

router.use('/api', api.routes())

export default router
