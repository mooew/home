const WebSocket = require('ws');
var light = require('./knx.js').light
var lightDim = require('./knx.js').lightDim

var knxLightSwitch = require('./knx.js').knxLightSwitch
var knxLightDim = require('./knx.js').knxLightDim

//var temp = require('./knx.js').temp

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {


//--------------------INCOMING--------------------------------//
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    var obj = JSON.parse(message)
    console.log('parse: ' + obj)
    if(obj.topic == 'switch1'){
      if(obj.payload){
        light.switchOn();
        //knxLightSwitch[0].switchOn();
      }
      else {
        light.switchOff();
        //knxLightSwitch[0].switchOff();
      }
    }else if(obj.topic == 'dim1'){
        lightDim.write(obj.payload);
        //knxLightDim[0].write(obj.payload);
    }


  });

  ws.send('something');

/*  ----------------- TO TEST -------------------
  for( i in knxLightSwitch){
    knxLightSwitch[i].status.on('change', function(oldvalue, newvalue) {
      console.log("#### feedback LIGHT %j status: %j", i, newvalue);
      var res = { topic: 'switch1', payload: newvalue }
      ws.send(JSON.stringify(res));
    });

  for( i in knxLightDim){
    knxLightDim[i].status.on('change', function(oldvalue, newvalue) {
      console.log("#### feedback LIGHT %j DIM status: %j", i, newvalue);
      var res = { topic: 'dim1', payload: newvalue }
      ws.send(JSON.stringify(res));
    });
*/

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
