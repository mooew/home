const WebSocket = require('ws');

var knxCom = require('./knx.js').knxCom

var knxLightSwitch = require('./knx.js').knxLightSwitch
var knxLightDim = require('./knx.js').knxLightDim
var knxScreens = require('./knx.js').knxScreens
var knxSensors = require('./knx.js').knxSensors
var knxTriggers = require('./knx.js').knxTriggers

const wss = new WebSocket.Server({ port: 8080 });

function socketSend(resp){
  wss.clients.forEach(function each(client) {
    if ( client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(resp));
    } else {
      console.log("sorry client is closed");
    };
  });
};

//////////////////Listen for KNX//////////////////////////
for(let j in knxCom){
  for(let i in knxCom[j].ga){
    console.log("binde to %j", knxCom[j].ga[i].id)
    //only bind if we have status_ga
    if(typeof knxCom[j].ga[i].status_ga !== "undefined"){
      knxCom[j].ga[i].status.on('change', function(oldvalue, newvalue) {
        console.log("#### feedback %j gui %j status: %j",
          knxCom[j].ga[i].id,
          +i + 1 + knxCom[j].offset,
          newvalue);
        socketSend({ topic: +i + 1 + knxCom[j].offset, payload: newvalue });
      });
    };
  };
};

wss.on('connection', function connection(ws, req) {
  const ip = req.connection.remoteAddress;
  console.log("Socket connected to: " + ip);


//--------------------INCOMING SOCKET SEND KNX--------------------------------//
ws.on('message', function incoming(message) {
    //console.log('received: %s', message);

    var obj = JSON.parse(message)
    var id = parseInt(obj.topic)
    console.log('gui: ' + obj.topic + ' is updated to: ' + obj.payload);
//LIGHTS
    if(id < 100){
      obj.payload ? knxCom.lights.ga[id-1].switchOn() : knxCom.lights.ga[id-1].switchOff();
//DIMMERS
    }else if(id >= 100 && id < 200){
      knxCom.dimmers.ga[id-101].write(obj.payload); //dim vaulue
//SCREENS
    }else if(id >= 200 && id < 300){
      knxCom.screens.ga[id-201].write(obj.payload); //TargetPosition
//SWITCHES
    }else if(id >= 400 && id < 500){
      obj.payload ? knxCom.triggers.ga[id-401].switchOn() : knxCom.triggers.ga[id-401].switchOff();
    };
});

ws.on('close', function close() {
  console.log('disconnected');
});




});
