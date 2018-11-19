'use strict';

var dispatcher = require('redux-scuttlebutt/lib/server').default

var app = new (require('express'))()
var server = require('http').Server(app)

var port = process.env['PORT'] || 3000

dispatcher(server)

server.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("Primus is listening on port %s.", port)
  }
})
