var app = require('../server')
const http = require('http')
const port = (env.PORT ? env.PORT : 8080)

var server = http.createServer(app) // create a http server

server.listen(port) // listen on specific port

server.on('error', onError) // listening error event on http server

// listening event while http server is in connecting mode
server.on('listening', onListening)
server.timeout = 300000

process.on('uncaughtException', (err) => {
  console.log(__filename, 'process.on(uncaughtException)', err.stack)
  process.exit(0)
})

/**
 * Event listener for HTTP server "error" event.
 */
function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(__filename, 'onError', bind + ' requires elevated privileges')
      process.exit(0)
      break

    case 'EADDRINUSE':
      console.error(__filename, 'onError', bind + ' is already in use')
      process.exit(0)
      break

    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening () {
  let addr = server.address()

  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.info(__filename, 'onListening', 'Listening on ' + bind)
}
