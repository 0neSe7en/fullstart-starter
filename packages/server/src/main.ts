import * as config from 'config'

import app from './app'

app.listen(config.get('port'), () => {
	console.log('listening', config.get('port'))
})
