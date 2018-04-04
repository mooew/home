const WebSocket = require('ws');
var light = require('./knx.js').light
var lightDim = require('./knx.js').lightDim

const wss = new WebSocket.Server({ port: 8080 });
var val = 10;

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    var obj = JSON.parse(message)

    if(obj.topic == 'switch1'){
      if(obj.payload){
        light.switchOn();
      }
      else {
        light.switchOff();
      }
    }else if(obj.topic == 'dim1'){
      var val = obj.payload * 2
        lightDim.write(val);

    }


  });

  ws.send('something');
});
