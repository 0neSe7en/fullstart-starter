import * as config from 'config'
import * as mongoose from 'mongoose'

mongoose.connect(
	config.get<string>('mongo.url'),
	config.get('mongo.options')
).then(() => {
	console.log('Success connected mongodb')
}).catch(err => {
	console.error('failed connect mongodb:', err)
})
