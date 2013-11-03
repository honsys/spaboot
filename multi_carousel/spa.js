#!/usr/bin/env node
//
// from http://stackoverflow.com/questions/9914816/what-is-an-example-of-the-simplest-possible-socket-io-example
// hon -- but modified to use App global scope obj and handle css and js text requests as well as spa html
//
var App = require('./js/AppMain.js');
// above should setup global App object with main entry func.
// that takes a single optional argv (array or hash).
// invoke the application main:
var argv = [__dirname, 12345]; // default argv: Spa root directory, and service port-number
//
// app entry:
App.main(argv);

// App users guide (usage) may be discussed here (markdown doc):
/*
### App Header-Top: NodeJS Socket.io Single. Page. App (Spa)
 ## App Section Header: Spa 
  # App Section SubHeader: Single Page Apps. are cool
  This App is a NodeJS Socket.io Single. Page. App with realtime streaming
---
  * NodeJS
  * Socket.io
  ** Streams: websockets! 
  ** Rooms: MOM like ActiveMQ "Topics" (as opposed to Queues)
*/

