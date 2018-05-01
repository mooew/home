var knx = require('knx');
var Value = require('./knxTypes/Value.js').Value
var Sensor = require('./knxTypes/Sensor.js').Sensor
var Trigger = require('./knxTypes/Trigger.js').Trigger


var lights = require('./ets.js').lights
var screens = require('./ets.js').screens
var sensors = require('./ets.js').sensors
var triggers = require('./ets.js').triggers

var knxCom = {
  "lights": {"name": "light","offset": 0, "ga": []},
  "dimmers": {"name": "dim","offset": 100, "ga": []},
  "screens": {"name": "screen","offset": 200, "ga": []},
  "sensors": {"name": "senor", "offset": 300, "ga": []},
  "triggers": {"name": "trigger","offset": 400, "ga": []}
};

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
// knxCom.lights.ga[j].status.current_value);

//---------------------connect switch lights-----------------------------//

for(j in lights){
  knxCom.lights.ga[j] = new knx.Devices.BinarySwitch(
    {ga: lights[j].ga, status_ga: lights[j].status_ga},
    connection
  );
  knxCom.lights.ga[j].id = lights[j].name;

  if(typeof lights[j].dim !== "undefined"){
    knxCom.dimmers.ga[j] = new Value(
      {ga: lights[j].dim, status_ga: lights[j].status_dim},
      connection
    );
    knxCom.dimmers.ga[j].id = lights[j].name;
  };
};


//---------------------connect screens-----------------------------//
for(j in screens){
    knxCom.screens.ga[j] = new Value(
      {ga: screens[j].ga, status_ga: screens[j].status_ga},
      connection
    );
    knxCom.screens.ga[j].id = screens[j].name;
};

//---------------------connect sensor-----------------------------//
for(j in sensors){
    knxCom.sensors.ga[j] = new Sensor(
      {ga: sensors[j].ga, status_ga: sensors[j].status_ga},
      connection
    );
    knxCom.sensors.ga[j].id = sensors[j].name;
};

//---------------------connect trigger-----------------------------//
for(j in triggers){
    knxCom.triggers.ga[j] = new Trigger(
      {ga: triggers[j].ga, status_ga: triggers[j].status_ga},
      connection
    );
    knxCom.triggers.ga[j].id = triggers[j].name;
};

module.exports.knxCom = knxCom;
