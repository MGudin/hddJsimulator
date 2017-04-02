'use strict';

import {
    Hdd,
    LotsBatch,
    Scheduler,
    Simulation,
    Lot,
} from '../src/libhdd';

var batches = {
  with_pfs: function () {
    return new LotsBatch([
      {lot: Lot.fromString('99 110 42 25 186 270 50 99 *147 81 257 94 133 212 175 130'), movementsUntilNextLot: 30},
      {lot: Lot.fromString('85 *150 202 288'), movementsUntilNextLot: 40},
      {lot: Lot.fromString('75 *149 285 201 59'), movementsUntilNextLot: 0}
    ])
  },

  wo_pfs: function() {
    return new LotsBatch([
    {lot: Lot.fromString('126 147 81 277 94 150 212 175 140 225 280 50 99 118 22 55'), movementsUntilNextLot: 30},
    {lot: Lot.fromString('75 115 220 266'), movementsUntilNextLot: 0}
    ])
  },
  exercise12: function() {
    return new LotsBatch([
    {lot: Lot.fromString('86 147 91 177 94 150 102 175 130 32 120 58 66 115') }
    ])
  },
}

// TP6-N6-iso.pdf
// ex 12
var hdd12 = new Hdd({
  name:   'Excercise 12 HDD',
  tracks: 199
})

var simulation12 = function() {
  return new Simulation({
    name : 'Excercise 12 simulation',
    direction: true,
    position: 83,
    hdd: hdd12,
    lotsBatch: batches.exercise12()
  });
}

// ex 14

var hdd14 = new Hdd({
  name:   'Excercise 14 HDD',
  tracks: 299
})

var simulation14 = function() {

  return new Simulation({
    name : 'Excercise 14 simulation',
    direction: true,
    position: 143,
    hdd: hdd14,
    lotsBatch: batches.wo_pfs()
  })
}

// ex 15
var hdd15 = new Hdd({
  name:   'Excercise 15 HDD',
  tracks: 299
})


var simulation15 = function() {

  return new Simulation({
    name : 'Excercise 15 simulation',
    direction: true,
    position: 140,
    hdd: hdd15,
    lotsBatch: batches.with_pfs()
  })
}

module.exports = {
  batches,
  simulation14,
  simulation12,
  simulation15,
}
