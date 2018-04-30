var knx = require('knx');
var ValDimmer = require('./ValDimmer.js').ValDimmer
var Screen = require('./Screen.js').Screen
var Sensor = require('./Sensor.js').Sensor
var Trigger = require('./Trigger.js').Trigger

//var Temp = require('./temperature.js').Temp

var lights = require('./ets.js').lights
var screens = require('./ets.js').screens
var sensors = require('./ets.js').sensors
var triggers = require('./ets.js').triggers

var knxCom = {
  "lights": {"name": "light","offset": 0, "ga": []},
  "dimlights": {"name": "dim","offset": 100, "ga": []},
  "screens": {"name": "screen","offset": 200, "ga": []},
  "sensors": {"name": "senor", "offset": 300, "ga": []},
  "triggers": {"name": "trigger","offset": 400, "ga": []}
}

var connection = knx.Connection({
  ipAddr: '192.168.2.247', ipPort: 3671,
  //physAddr: '1.1.130',    //msi
  physAddr: '1.1.129',  //pi zero
  //debug: true,
  // wait at least 10 millisec between each datagram
  minimumDelay: 100,
  handlers: {
    connected: function() {
      console.log('Connected to KNX!');
    },
    // display telegrams on th eknx bus
    event: function (evt, src, dest, value) {
/*
      console.log("%s **** KNX EVENT: %j, src: %j, dest: %j, value: %j",
      new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          evt, src, dest, value);
*/
    },
    // get notified on connection errors
    error: function(connstatus) {
      console.log("**** ERROR: %j", connstatus);
    }
  }
});


//---------------------connect switch lights-----------------------------//

for(j in lights){
  console.log("index switch is " + j + "!!!!!!!!!!!");
  knxCom.lights.ga[j] = new knx.Devices.BinarySwitch(
    {ga: lights[j].ga, status_ga: lights[j].status_ga},
    connection
  );
  console.log("The light %j status is %j",
  j, knxCom.lights.ga[j].status.current_value);
}

//---------------------connect dim lights-----------------------------//

for(j in lights){
  console.log("index dim is " + j + "!!!!!!!!!!!");
  if(typeof lights[j].dim !== "undefined"){
    knxCom.dimlights.ga[j] = new ValDimmer(
      {ga: lights[j].dim, status_ga: lights[j].status_dim},
      connection
    );
    console.log("The light %j status is %j",
    j, knxCom.dimlights.ga[j].status.current_value);
  }
}

//---------------------connect screens-----------------------------//
for(j in screens){
  console.log("index screen is " + j + "!!!!!!!!!!!");
    knxCom.screens.ga[j] = new Screen(
      {ga: screens[j].ga, status_ga: screens[j].status_ga},
      connection
    );
    console.log("The screen %j status is %j",
    j, knxCom.screens.ga[j].status.current_value);
}

//---------------------connect sensor-----------------------------//
for(j in sensors){
  console.log("index sensor is " + j + "!!!!!!!!!!!");
    knxCom.sensors.ga[j] = new Sensor(
      {sensor: sensors[j].sensor},
      connection
    );
    console.log("The %j status is %j",
    sensors[j].name ,
    knxCom.sensors.ga[j].status.current_value);
}

//---------------------connect sensor-----------------------------//
for(j in triggers){
  console.log("index trigger is " + j + "!!!!!!!!!!!");
    knxCom.triggers.ga[j] = new Trigger(
      {ga: triggers[j].ga, status_ga: triggers[j].status_ga},
      connection
    );
    //console.log("The %j status is %j",triggers[j].name , knxTriggers[j].status.current_value);
}

module.exports.knxCom = knxCom
