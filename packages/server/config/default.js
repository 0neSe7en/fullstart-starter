module.exports = {
  port: 3000,
  mongo: {
    options: {
      useNewUrlParser: true,
      config: {
        autoIndex: false,
      },
    },
		url: 'mongodb://localhost/test',
  },
  redis: {
    options: {
      keyPrefix: 'prefix:',
    },
  }
}
