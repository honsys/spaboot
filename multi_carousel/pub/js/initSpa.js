// initialize the single page app. (SPA) onload of the body element:
// <body onload="initSPA('#messages')"> ... </body>
// use jquery selector -- $(Id_or_class_or_tag_arg) -- for msgId == '#message' 
//
function initSpa(msgId, sockserver, sockport) {
  //var msgId = '#messages';
  //var sockserver = 'honsys.net'; // 'honspresso';
  //var sockport = '12345';
  var siocon = '//' + sockserver + ':' + sockport; 
  console.log('attempt socket.io connection with ' + siocon); // only chrome console?
  var socket = io.connect(siocon);
  socket.on('welcome', function(data) {
    console.log(data);
    $(msgId).append('<li>' + data.message + '</li>');
    socket.emit('client', {data: 'ACQ: '+data.message});
  });
  socket.on('time', function(data) {
    console.log(data);
    $(msgId).append('<li>' + data.time + '</li>');
    socket.emit('client', {data: 'ACQ: '+data.time});
  });
  //socket.on('error', function() { console.error(arguments); });
  //socket.on('message', function() { console.log(arguments); });
};
// jquery magic (if body tag-element does not indicate onload event func.):
//$(document).ready(initSpa);
//@ sourceURL=initSpa.js
