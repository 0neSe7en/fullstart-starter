module.exports = {
  port: 3001,
  mongo: {
    options: {
      useNewUrlParser: true,
      config: {
        autoIndex: true,
      },
    },
		url: 'mongodb://localhost/test',
  },
	auth: {
		secret: 'localserver',
		cookieName: 'hack-2019:sess:auth_token'
	},
  redis: {
    options: {
      keyPrefix: 'prefix:',
    },
  }
}
