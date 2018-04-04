const WebSocket = require('ws');
var light = require('./knx.js').light
var lightDim = require('./knx.js').lightDim

const wss = new WebSocket.Server({ port: 8080 });

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
        lightDim.write(obj.payload);
    }


  });

  ws.send('something');
});
