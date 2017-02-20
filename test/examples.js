'use strict';

const root_dir    = '../'
const lib_sim     = require(`${root_dir}src/simulation.js`);
const LotsBatch   = lib_sim.LotsBatch;
const parsers     = require(`${root_dir}src/parsers.js`);
const LotParser   = parsers.LotParser;

batches = {
  with_pfs: new LotsBatch([
    {lot: LotParser('99 110 42 25 186 270 50 99 *147 81 257 94 133 212 175 130'), movementsUntilNextLot: 30} 
    {lot: LotParser('85 *150 202 288'), movementsUntilNextLot: 40}
    {lot: LotParser('75 *149 285 201 59'), movementsUntilNextLot: 0}
  ]),
  wo_pfs: new LotsBatch([
    {lot: LotParser('126 147 81 277 94 150 212 175 140 225 280 50 99 118 22 55'), movementsUntilNextLot: 30} 
    {lot: LotParser('75 115 220 266'), movementsUntilNextLot: 0}
  ]),
}

module.exports = { batches }
