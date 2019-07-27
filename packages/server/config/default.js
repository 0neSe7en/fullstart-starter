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
  redis: {
    options: {
      keyPrefix: 'prefix:',
    },
  }
}
