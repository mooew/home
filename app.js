const WebSocket = require('ws');

var light = require('./knx.js').light
var lightDim = require('./knx.js').lightDim

var knxLightSwitch = require('./knx.js').knxLightSwitch
var knxLightDim = require('./knx.js').knxLightDim

//var temp = require('./knx.js').temp

const wss = new WebSocket.Server({ port: 8080 });

for( i in knxLightSwitch){
  console.log("light: " + i);
  knxLightSwitch[i].status.on('change', function(oldvalue, newvalue) {
    console.log("#### feedback LIGHT %j status: %j", i, newvalue);
    var res = { topic: 'switch1', payload: newvalue };
    //ws.send(JSON.stringify(res));
    wss.clients.forEach(function each(client) {
      if ( client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(res));
      } else {
        console.log("sorry client is closed");
      };
    });
  });
};

for( i in knxLightDim){
  console.log("dim: " + i);
  knxLightDim[i].status.on('change', function(oldvalue, newvalue) {
    console.log("#### feedback LIGHT %j DIM status: %j", i, newvalue);
    var res = { topic: 'dim1', payload: newvalue};
    wss.clients.forEach(function each(client) {
      if ( client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(res));
      } else {
        console.log("sorry client is closed");
      };
    });
  });
};

wss.on('connection', function connection(ws, req) {
  const ip = req.connection.remoteAddress;
  console.log("Socket connected to: " + ip);


//--------------------INCOMING--------------------------------//
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    var obj = JSON.parse(message)
    console.log('parse: ' + obj)
    if(obj.topic == 'switch1'){
      if(obj.payload){
        knxLightSwitch[0].switchOn();
      }
      else {

        knxLightSwitch[0].switchOff();
      }
    }else if(obj.topic == 'dim1'){
        knxLightDim[0].write(obj.payload);
    }


  });
  ws.on('close', function close() {
  console.log('disconnected');
  });






/*
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

*/

/*
  temp.status.on('change', function(oldvalue, newvalue) {
    console.log("#### feedback temp status: %j", newvalue);
    var res = { topic: 'temp1', payload: newvalue }
    ws.send(JSON.stringify(res));
  });
*/


});
