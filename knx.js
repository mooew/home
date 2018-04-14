var knx = require('knx');
var ValDimmer = require('./ValDimmer.js').ValDimmer
//var Temp = require('./temperature.js').Temp



var connection = knx.Connection({
  ipAddr: '192.168.2.221', ipPort: 3671,
  physAddr: '1.1.128',
  //debug: true,
  handlers: {
    connected: function() {
      console.log('Connected to KNX!');
/*
      for (var key in ets){
        //console.log(ets)
        var obj = ets[key];
        obj.bind(connection)
      }
*/


    },
    // display telegrams on th eknx bus
    event: function (evt, src, dest, value) {
      console.log("%s **** KNX EVENT: %j, src: %j, dest: %j, value: %j",
      new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          evt, src, dest, value);

    },
    // get notified on connection errors
    error: function(connstatus) {
      console.log("**** ERROR: %j", connstatus);
    }
  }
});

//----------------------------LIGHT---------------------------------------------

var lights = [

  {
  "id": 1,
  "name":"light1",
  "ga": '1/0/0',
  "status_ga": '1/0/1',
  "dim": '1/0/3',
  "status_dim": '1/0/4',
},{
  "id": 2,
  "name": "light2",
  "ga": '1/1/0',
  "status_ga": '1/1/1',
  "dim": '1/1/3',
  "status_dim": '1/1/4',
  },{
  "id": 3,
  "name": "light3",
  "ga": '1/1/0',
  "status_ga": '1/1/1',
  }
]

var knxLightSwitch = [];
var knxLightDim = [];

//---------------------connect switch lights-----------------------------//
/*
for(j in lights){
  knxLightSwitch[j] = new knx.Devices.BinarySwitch(
    {ga: lights[j].ga, status_ga: lights[j].status_ga},
    connection
  );
  console.log("The light %j status is %j", j ,light.status.current_value);
}
//listen for status changes
knxLights[0].status.on('change', function(oldvalue, newvalue) {
  console.log("**** LIGHT status changed from: %j to: %j", oldvalue, newvalue);
});
/*/
//---------------------connect switch lights-----------------------------//


var light = new knx.Devices.BinarySwitch({ga: '1/0/0', status_ga: '1/0/1'}, connection);
console.log("The current light status is %j", light.status.current_value);


//----------------------------DIM-----------------------------------------------

var lightDim = new ValDimmer({ga: '1/0/3', status_ga: '1/0/4'}, connection);
console.log("The current light status is %j", lightDim.status.current_value);



/*
var temp = new Temp({ga: '0/1/1', status_ga: '0/0/4'}, connection);
//console.log("The current light status is %j", lightDim.status.current_value);

//lightDim.control.on('change', function(oldvalue, newvalue) {
  //console.log("**** DIM control changed from: %j to: %j", oldvalue, newvalue);
//});
temp.status.on('change', function(oldvalue, newvalue) {
  console.log("**** Temp changed from: %j to: %j", oldvalue, newvalue);
});
*/


module.exports.light = light
module.exports.lightDim = lightDim
//module.exports.temp = temp
module.exports.connection = connection
module.exports.knxLightSwitch = knxLightSwitch
module.exports.knxLightDim = knxLightDim
