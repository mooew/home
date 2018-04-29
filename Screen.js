/**
* knx.js - a pure Javascript library for KNX
* (C) 2018 wietse
*/

const util = require('util');
const knx = require('knx');

function Screen(options, conn) {
  if (options == null || options.ga == null) {
    throw "must supply at least { ga }!";
  }
  this.control_ga = options.ga;
  this.status_ga = options.status_ga;
  if (conn) this.bind(conn);
}

Screen.prototype.bind = function (conn) {
  if (!conn) console.trace("must supply a valid KNX connection to bind to");
  this.conn = conn;
  this.control = new knx.Datapoint({ga: this.control_ga, dpt: 'DPT5.001'}, conn);
  if (this.status_ga) {
    this.status = new knx.Datapoint({ga: this.status_ga, dpt: 'DPT5.001'}, conn);
  }
}

// EventEmitter proxy for status ga (if its set), otherwise proxy control ga
Screen.prototype.on = function () {
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

Screen.prototype.dim = function (value) {
  if (!this.conn) console.trace("must supply a valid KNX connection to bind to");
  this.control.write(value);
  console.log(value);
}

Screen.prototype.switchOff = function () {
  if (!this.conn) console.trace("must supply a valid KNX connection to bind to");
  this.control.write(0);
}

Screen.prototype.write = function (v) {
  if (!this.conn) console.trace("must supply a valid KNX connection to bind to");
  this.control.write(v);
}

module.exports.Screen = Screen;
