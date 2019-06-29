/* eslint-disable no-undef,no-unused-vars */
express = module.exports = require('express')
const expressValidator = require('express-validator')
const helmet = require('helmet') // security package
Sequelize = module.exports = require('sequelize')
const cors = require('cors')
_ = module.exports = require('underscore')
Op = module.exports = Sequelize.Op
BASE_PATH = module.exports = __dirname
fs = module.exports = require('fs')
moment = module.exports = require('moment')
const fileUpload = require('express-fileupload')
// configuration file
env = module.exports = require('./config/env') // import env file
hbs = require('handlebars')
constants = module.exports = require('./utils/constants')
bodyParser = module.exports = require('body-parser')

let portNumber = (env.PORT) ? env.PORT : 8080
console.info(__filename, '', 'Application is runnign at port :' + portNumber)

console.log('Swagger Doc is running at : ' + env.HOST_NAME + ':' + env.PORT + '/api-docs/#/')

// utils file
helpers = module.exports = require('./utils/helper')
messages = module.exports = require('./utils/messages')
let app = express() // create an instance of an express

// create an instance of swagger-ui for api-doc
require('./lib/swaggerApiDoc')(app)

/**
 * create application/x-www-form-urlencoded parser with
 * request size limit to 5 mb
 */
app.use(bodyParser.urlencoded({extended : false})) // extended false will accept only string and array
app.use(bodyParser.json())
app.use(express.static('public'))
// app.use(express.static(BASE_PATH + '/public/images/books'))
app.use(express.json({limit: '1000mb'}));
app.use(express.urlencoded({limit: '1000mb'}))
app.use(fileUpload())

app.use(express.json()) // create application/json parser

app.use(helmet())

app.disable('x-powered-by')
app.disable('etag') // this will disable etag to restrict 304 status

// include before other routes options method
app.options('*', cors({ optionsSuccessStatus: constants.SUCCESS }))

// database connection
sequelizeObj = module.exports = require('./lib/sequelize')

// list out routes
let authRoute = require('./app/components/auth/authRoute')
let booksRoute = require('./app/components/books/booksRoute')
let publicRoute = require('./routes/index')

app.use('/api/v1/books', booksRoute)
app.use('/api/v1/auth', authRoute)
app.use('/', publicRoute)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Bad Request')
  err.status = constants.NOT_FOUND
  next(err)
})

function exitHandler () {
  console.error(__filename, '', 'Exit handler')
  process.exit(1)
}

['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException',
  'SIGTERM'].forEach((eventType) => {
  process.on(eventType, exitHandler.bind())
})

app.use((err, req, res, next) => {
  console.error(__filename, '', 'last error handled', err.stack)
  console.debug(__filename, 'server error handle', req.method, req.url)
  var statusCode = err.status || constants.SERVER_ERROR

  helpers.createResponse(res, statusCode,
    messages.INTERNAL_SERVER_ERROR,
    {
      error: messages.INTERNAL_SERVER_ERROR
    }
  )
})

module.exports = app
