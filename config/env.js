'use strict'

module.exports = {
  ENVIRONMENT: 'local',
  PORT: 8080,
  HOST_NAME: 'localhost',
  BCRYPT_SALT: 10,
  JWT_SECRET: 'o9J2$ae1&sJt$xf',
  JWT_EXPIRE_TIME: 18000, // in seconds

  // database configuration
  database: {
    HOST: 'localhost',
    DATABASE: 'practice',
    USERNAME: 'smart',
    PASSWORD: '',
    PORT: 3306,
    LOGGING: console.log
  },
  APP_NAME: 'ketav-practicle',
  // cors configuration options
  API_WHITELIST_URL: ['*'],
  APPLY_ALLOW_ORIGIN_FILTER: false,
  EMAIL_FROM: 'example@gmail.com',
  TEMP_PASSWORD: 'myPassword@123',
  EMAIL_SENDER_NAME: 'Ketav Chotaliya'
}
