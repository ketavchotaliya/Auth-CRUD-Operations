/* eslint-disable no-undef */
'use strict'

const Sequelize = require('sequelize')
var sequelize = new Sequelize(env.database.DATABASE,
  env.database.USERNAME,
  env.database.PASSWORD, {
    host: env.database.HOST,
    port: env.database.PORT,
    dialect: 'mysql',
    pool: {
      min: 5,
      max: 90,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      supportBigNumbers: true,
      bigNumberStrings: false
    },
    debug: true,
    logging:  env.database.LOGGING || false,
    row: false
  }
)

sequelize.authenticate().then(() => {
  console.info(__filename, 'sequelize.authenticate', 'database connected successfully')
}).catch((err) => {
  console.error(__filename, 'sequelize.authenticate', 'Exception occured during database connection', err)
  let error = new Error(messages.SERVICE_UNAVAILABLE)
  error.status = constants.SERVICE_UNAVAILABLE
  throw error
})

module.exports = sequelize
