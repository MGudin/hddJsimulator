var Simulation = require('../simulation').Simulation;
var hdd = require('./hdd').hdd;
var batch = require('./batch').batch;
var lot = require('./lot').lot;

var simulation = {
  position: 0,
  direction: true,
  toggleDirection: () => {
    simulation.direction = !simulation.direction
  },
  setPosition: (position) => {
    simulation.position = Number(position)
  },
  construct: () => {
    batch.lots = [{lot: lot.parse(), movementsUntilNextLot: 0}];
    return  new Simulation({
      direction: simulation.direction,
      position: simulation.position,
      hdd: hdd.construct(),
      lotsBatch: batch.construct()
    })
  }
}

module.exports = {
  simulation,
}
