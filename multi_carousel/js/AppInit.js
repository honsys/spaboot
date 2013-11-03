#!/usr/bin/env node
// AppInit.js
// please do not invoke/require AppInit more than once during server-exec (no re-inits)! 
// ok to use a sync. i/o at start-up / init (in-memory one-time file i/o used by handlers/callbacks)

var htmlInit = function(App) {
  // separate server-side from client-side components...
  // all client stuff under 'pub' directory (short for publish / public)
  //var htmlspa, regex = new RegExp('\x3c*body*onload*\x3e','g'); // <body onload='initSpa(...)'>
  var htmlspa = "";
  var htmlfile = App.root + '/pub/index.html';
  var html_placeholder = App.root + '/pub/.index.html';
  var hrex = new RegExp('HostPlaceHolder','g'); // <body onload='initSpa(...)'>
  var prex = new RegExp('PortPlaceHolder','g'); // <body onload='initSpa(...)'>
  var onload = '<body onload="initSpa(' + '\'#messages\',\'' + App.hostname + '\',\'' + App.port + '\')">';
  console.log('set html body attribs with:\n' + onload); 
  // set socket.io server hostname and socket.io port in index.html onload='initSpa()' invocation:
  // reset placedholders in <body onloadr= ...> statment and store modified html file in-memory:
  try {
    htmlspa = App.fs.readFileSync(html_placeholder).toString();
    htmlspa = htmlspa.replace(prex, App.port).replace(hrex, App.hostname);
    App.fs.writeFileSync(htmlfile, htmlspa, 'utf8');
    // minify into in-memory-cache:
    App.index = htmlspa.replace(/\s+/g, " ").replace(/[\r\n]/g, "").trim();
  }
  catch( ex ) { console.error(htmlfile + ' read or write failed ... ' + ex.message); return -1; }
  return htmlspa.length;
}

var AppInit = function(App) {
  // AppInit is sole export from this module
  App.fs = require('fs');
  var path = App.root + '/pub'; // note (path+item) concats below -- for css and client js items
  console.log('Single page app. (Spa) one-time-init: ' + path);

  // set socket.io server hostname and socket.io port in index.html onload initSpa invocation:
  var size = htmlInit(App);
  if( size <= 0 ) { console.error('failed to init spa index.html, abort...'); return size; }
  // assume client static file request url-paths are like '/foo/bar/whatev' so
  // that full path to any such file is App.root + '/pub' + url-path req...
  App.css = ['/css/head_foot.css', null];
  App.js = ['/js/jquery.js', '/js/socket.io.js', '/js/initSpa.js', null];

  // multiple css and js could be merged and minified ... so spa index.html need on indicate the one
  // resultant script file ... perhaps somehow using requirejs to ensure propper ordering of deps?
  App.csslist = [];
  App.css.forEach(function(item) {
    if( item ) {
      App.csslist[item] = App.fs.readFileSync(path+item).toString().replace(/\s+/g, " ").replace(/[\r\n]/g, "").trim(); 
      console.error(item); console.error(path); console.error(App.csslist[item]);
    }
  });

  App.jslist = [];
  App.js.forEach(function(item) {
    if( item ) {
      //browsers evidently {'Content-Type': 'application/javascript'} do not handle this text stream:
      //App.jslist[item] = App.fs.readFileSync(item).toString().replace(/\s+/g, " ").replace(/[\r\n]/g, "").trim();
      App.jslist[item] = App.fs.readFileSync(path+item);  // this object works
      console.error(item); console.error(path); console.error(App.csslist[item]);
    }
  });
}; // AppInit(App)

module.exports = AppInit;
// AppInit.js
