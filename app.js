const WebSocket = require('ws');

var light = require('./knx.js').light
var lightDim = require('./knx.js').lightDim

var knxLightSwitch = require('./knx.js').knxLightSwitch
var knxLightDim = require('./knx.js').knxLightDim
var knxScreens = require('./knx.js').knxScreens
var knxSensors = require('./knx.js').knxSensors
var knxTriggers = require('./knx.js').knxTriggers



const wss = new WebSocket.Server({ port: 8080 });

for(let i in knxLightSwitch){
  console.log("listening for light status %j", +i + 1);
  knxLightSwitch[i].status.on('change', function(oldvalue, newvalue) {
    console.log("#### feedback LIGHT %j status: %j", +i + 1, newvalue);
    var res = { topic: +i + 1, payload: newvalue };
    wss.clients.forEach(function each(client) {
      if ( client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(res));
      } else {
        console.log("sorry client is closed");
      };
    });
  });
};

for(let i in knxLightDim){
  console.log("listening for light dim %j", i);
  knxLightDim[i].status.on('change', function(oldvalue, newvalue) {
    console.log("#### feedback LIGHT %j DIM status: %j", +i + 101, newvalue);
    var res = { topic: +i + 101, payload: newvalue};
    wss.clients.forEach(function each(client) {
      if ( client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(res));
      } else {
        console.log("sorry client is closed");
      };
    });
  });
};

for(let i in knxScreens){
  console.log("listening for screen %j", i);
  knxScreens[i].status.on('change', function(oldvalue, newvalue) {
    console.log("#### feedback SCREEN %j  status: %j", +i + 201, newvalue);
    var res = { topic: +i + 201, payload: newvalue};
    wss.clients.forEach(function each(client) {
      if ( client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(res)); //CurrentPosition
      } else {
        console.log("sorry client is closed");
      };
    });
  });
};

for(let i in knxSensors){
  console.log("listening for sensor %j", i);
  knxSensors[i].status.on('change', function(oldvalue, newvalue) {
    console.log("#### feedback SENSOR %j  status: %j", +i + 301, newvalue);
    var res = { topic: +i + 301, payload: newvalue};
    wss.clients.forEach(function each(client) {
      if ( client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(res)); //CurrentPosition
      } else {
        console.log("sorry client is closed");
      };
    });
  });
};

for(let i in knxTriggers){
  console.log("listening for triggers %j", i);
  knxTriggers[i].status.on('change', function(oldvalue, newvalue) {
    console.log("#### feedback TRIGGER %j  status: %j", +i + 401, newvalue);
    var res = { topic: +i + 401, payload: newvalue};
    wss.clients.forEach(function each(client) {
      if ( client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(res)); //CurrentPosition
      } else {
        console.log("sorry client is closed");
      };
    });
  });
};

wss.on('connection', function connection(ws, req) {
  const ip = req.connection.remoteAddress;
  console.log("Socket connected to: " + ip);


//--------------------INCOMING SOCKET SEND KNX--------------------------------//
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    var obj = JSON.parse(message)
    var id = parseInt(obj.topic)
    console.log('gui: ' + obj.topic + ' is updated to: ' + obj.payload);
    if(id < 100){
      if(obj.payload){
        knxLightSwitch[id-1].switchOn();
      }
      else {
        knxLightSwitch[id-1].switchOff();
      }
    }else if(id >= 100 && id < 200){
        knxLightDim[id-101].write(obj.payload);
    }else if(id >= 200 && id < 300){
      knxScreens[id-201].write(obj.payload); //TargetPosition
    }else if(id >= 400 && id < 500){
      if(obj.payload){
        knxTriggers[id-401].switchOn();
      }
      else {
        knxTriggers[id-401].switchOff();
      }
    }


  });
  ws.on('close', function close() {
  console.log('disconnected');
  });




/*
  temp.status.on('change', function(oldvalue, newvalue) {
    console.log("#### feedback temp status: %j", newvalue);
    var res = { topic: 'temp1', payload: newvalue }
    ws.send(JSON.stringify(res));
  });
*/


});
