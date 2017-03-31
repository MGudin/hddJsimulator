var Scheduler = require('../scheduler').Scheduler;
var algorithm = require('./algorithm').algorithm;
var simulation = require('./simulation').simulation;
var algorithms = require('../algorithms');

var scheduler = {
  FCFS: algorithms.FCFS,
  SSTF: algorithms.SSTF,
  LOOK: algorithms.LOOK,
  CLOOK: algorithms.CLOOK,
  SCAN: algorithms.SCAN,
  CSCAN: algorithms.CSCAN,
  
  construct: () => {
    return new Scheduler(scheduler[algorithm.algorithm], simulation.construct());
  }
}

module.exports = scheduler
