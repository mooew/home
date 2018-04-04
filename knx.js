var knx = require('knx');

var output_pi_heat = new knx.Datapoint({ga: '0/0/10', dpt: 'DPT5.001'});

var ets = {
  output_pi_heat
};

var connection = knx.Connection({
  ipAddr: '192.168.2.221', ipPort: 3671,
  physAddr: '1.1.128',
  //debug: true,
  handlers: {
    connected: function() {
      console.log('Connected to KNX!');

      for (var key in ets){
        //console.log(ets)
        var obj = ets[key];
        obj.bind(connection)
      }



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

var light = new knx.Devices.BinarySwitch({ga: '1/0/0', status_ga: '1/0/1'}, connection);
console.log("The current light status is %j", light.status.current_value);
light.control.on('change', function(oldvalue, newvalue) {
  console.log("**** LIGHT control changed from: %j to: %j", oldvalue, newvalue);
});
light.status.on('change', function(oldvalue, newvalue) {
  console.log("**** LIGHT status changed from: %j to: %j", oldvalue, newvalue);
});
//light.switchOn(); // or switchOff();

var lightDim = new knx.Devices.ValDimmer({ga: '1/0/3', status_ga: '1/0/4'}, connection);
console.log("The current light status is %j", lightDim.status.current_value);
lightDim.control.on('change', function(oldvalue, newvalue) {
  console.log("**** LIGHT control changed from: %j to: %j", oldvalue, newvalue);
});
lightDim.status.on('change', function(oldvalue, newvalue) {
  console.log("**** LIGHT status changed from: %j to: %j", oldvalue, newvalue);
});


module.exports.ets = ets
module.exports.light = light
module.exports.lightDim = lightDim
module.exports.connection = connection
