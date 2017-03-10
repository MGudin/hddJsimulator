'use strict';

require('babel-polyfill');

const lib_sim = require('./simulation');
const algorithms = require('./algorithms');
const scheduler = require('./scheduler');

var batch = new lib_sim.Lot(
  [new lib_sim.Requirement(126),
   new lib_sim.Requirement(147),
   new lib_sim.Requirement(81),
   new lib_sim.Requirement(277),
   new lib_sim.Requirement(94),
   new lib_sim.Requirement(150),
   new lib_sim.Requirement(212),
   new lib_sim.Requirement(17),
   new lib_sim.Requirement(140),
   new lib_sim.Requirement(225),
   new lib_sim.Requirement(280),
   new lib_sim.Requirement(50),
   new lib_sim.Requirement(99),
   new lib_sim.Requirement(118),
   new lib_sim.Requirement(22),
   new lib_sim.Requirement(55)
  ]
);

var simulation = new lib_sim.Simulation();
var sched = new scheduler.Scheduler( algorithms.FCFS , simulation);
sched.context.unattended.requirements = batch;

module.exports = {
  lib_sim,
  algorithms,
  batch,
  scheduler,
  sched,
}
