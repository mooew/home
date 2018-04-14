const WebSocket = require('ws');
var light = require('./knx.js').light
var lightDim = require('./knx.js').lightDim
//var temp = require('./knx.js').temp

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    var obj = JSON.parse(message)
    console.log('parse: ' + obj)
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

  light.status.on('change', function(oldvalue, newvalue) {
    console.log("#### feedback LIGHT status: %j", newvalue);
    var res = { topic: 'switch1', payload: newvalue }
    ws.send(JSON.stringify(res));
  });

  lightDim.status.on('change', function(oldvalue, newvalue) {
    console.log("#### feedback DIM status: %j", newvalue);
    var res = { topic: 'dim1', payload: newvalue }
    ws.send(JSON.stringify(res));
  });


/*
  temp.status.on('change', function(oldvalue, newvalue) {
    console.log("#### feedback temp status: %j", newvalue);
    var res = { topic: 'temp1', payload: newvalue }
    ws.send(JSON.stringify(res));
  });
*/


});
