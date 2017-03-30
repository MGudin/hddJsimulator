'use strict';

require('babel-polyfill');
// just for development. TODO: separates bundles
const root_dir        = '../',
      m                 = require('mithril'),
      lib_sim           = require('./simulation'),
      Simulation        = lib_sim.Simulation,
      algorithms        = require('./algorithms'),
      Scheduler         = require('./scheduler').Scheduler,
      examples          = require('./../test/examples'),
      parsers           = require('./parsers'),
      LotParser         = parsers.LotParser,
      RequirementParser = parsers.RequirementParser,
      layouts           = require('./layouts');



module.exports = {
  m,
  lib_sim,
  algorithms,
  examples,
  Scheduler,
  Simulation,
  LotParser,
  RequirementParser,
  layouts
}
