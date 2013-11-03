#!/usr/bin/env node
// AppMain.js

// from http://stackoverflow.com/questions/9914816/what-is-an-example-of-the-simplest-possible-socket-io-example
// hon -- but modified to use App global scope obj and handle css and js text requests as well as spa index.html
//
var App = {}; // Single Page Application (SPA) namespace object

App.main = function(argv) {
  App.sio = require('socket.io');
  App.http = require('http');
  App.url = require('url');
  App.os = require('os');
  App.hostname = App.os.hostname();
  App.root = __dirname + '/..'; // presumes ../spa.js root invokes this server main entry func.
  App.port = 12345;
  App.tick = 60;

  if( argv ) {
    console.log(argv);
    if( argv.length > 0 ) { App.root = argv[0]; }
    if( argv.length > 1 ) { App.port = argv[1]; }
  }

  // complete the App by importing any/all other js files ...
  // init more App.attributes, memory-store, and single page index.html
  require('./AppInit.js')(App);
  // setup App.server callbacks
  require('./AppServer.js')(App);

  // startup service ...  
  // send current time every 'tick' secs
  setInterval(App.sendTime, App.tick*1000);

  // socket.io server listens to our app
  App.io = App.sio.listen(App.server);

  // emit welcome message on connection
  App.io.sockets.on('connection', App.onConnect);

  // serve-up (publish) the Spa page and wait for websocket connections from it
  App.server.listen(App.port);
}; // App.main()

module.exports = App;

// AppMain.js
