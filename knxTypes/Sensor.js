/**
* knx.js - a pure Javascript library for KNX
* (C) 2018 wietse
*/

const util = require('util');
const knx = require('knx');

function Sensor(options, conn) {
  if (options == null || options.status_ga == null) {
    throw "must supply at least { status_ga }!";
  }
  this.control_ga = options.ga;
  this.status_ga = options.status_ga;
  if (conn) this.bind(conn);
}

Sensor.prototype.bind = function (conn) {
  if (!conn) console.trace("must supply a valid KNX connection to bind to");
  this.conn = conn;
  if (this.control_ga) {
  this.control = new knx.Datapoint({ga: this.control_ga, dpt: 'DPT9.000'}, conn);
}
  if (this.status_ga) {
    this.status = new knx.Datapoint({ga: this.status_ga, dpt: 'DPT9.000'}, conn);
  }
}

// EventEmitter proxy for status ga (if its set), otherwise proxy control ga
Sensor.prototype.on = function () {
  var argsArray = Array.prototype.slice.call(arguments);
  var tgt = (this.status_ga ? this.status : this.control);
  // if(this.status_ga){this.status}
  //  else this.control
  try {
    tgt.on.apply(tgt, argsArray);
  } catch (err) {
    console.log(err);
  }
}


// UNUSED //
Sensor.prototype.dim = function (value) {
  if (!this.conn) console.trace("must supply a valid KNX connection to bind to");
  this.control.write(value);
  console.log(value);
}

Sensor.prototype.switchOff = function () {
  if (!this.conn) console.trace("must supply a valid KNX connection to bind to");
  this.control.write(0);
}

Sensor.prototype.write = function (v) {
  if (!this.conn) console.trace("must supply a valid KNX connection to bind to");
  this.control.write(v);
}
// UNUSED //

module.exports.Sensor = Sensor;
