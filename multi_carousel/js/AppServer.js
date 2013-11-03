#!/usr/bin/env node
// AppServer.js
// from http://stackoverflow.com/questions/9914816/what-is-an-example-of-the-simplest-possible-socket-io-example
// hon -- but modified to use App global scope obj and handle css and js text requests as well as spa html
//

var AppServer = function(App) {

  App.error = function(href, res) {
    var restyp = {'Content-Type': 'text/html'}; // default response mime-type
    var errmsg = href + ": No Content. Server has received the request but there is no information to send back.";
    console.error(errmsg);
    res.writeHead(204, restyp);
    return res.end(errmsg);
  }

  // send current time to all connected clients
  App.sendTime = function() {
    var timeval = new Date().toJSON();
    var message = { time: App.hostname+timeval };
    App.io.sockets.emit('time', message );
    console.error(message);
  };

  // connection message
  App.onConnect = function(socket) {
    socket.emit('welcome', { message: 'Welcome! Server messages via socket.io appended below at ' + App.tick + ' sec. ticks' });
    socket.on('client', console.error);
    App.sendTime(); // send first timestamp
  };

  // handle all requests
  App.httpHandler = function(req, res) {
    var reqmsg = App.url.parse(req.url);
    console.error("request received from: " + req.connection.remoteAddress);
    console.error(reqmsg.href);
    var restyp = {'Content-Type': 'text/html'}; // default response mime-type
    if( reqmsg.href.indexOf(".css") > 0 ) {
      if( ! App.csslist.hasOwnProperty(reqmsg.href) ) { return App.error(reqmsg.href, res); }
      restyp = {'Content-Type': 'text/css'};
      res.writeHead(200, restyp);
      return res.end(App.csslist[reqmsg.href]);
    }
    if( reqmsg.href.indexOf(".js") > 0 ) {
      if( ! App.jslist.hasOwnProperty(reqmsg.href) ) { return App.error(reqmsg.href, res); }
      restyp = {'Content-Type': 'application/javascript'};
      res.writeHead(200, restyp);
      return res.end(App.jslist[reqmsg.href]);
    }
    // default is html -- only one html file expected for single page app. (spa)
    res.writeHead(200, restyp);
    res.end(App.index);
  };
 
  App.server = App.http.createServer(App.httpHandler); // server startup/lsten in AppMain.js
}; // AppServer(App)

module.exports = AppServer;

// AppServer.js
