'use strict';

const root_dir = '..';
const Lot = require(`${root_dir}/src/simulation.js`).Lot;
const Requirement = require(`${root_dir}/src/simulation.js`).Requirement;

const RequirementParser = (req_str) => {

  return new Requirement(
    parseInt(req_str.replace(/\W/, '')),
    !!req_str.match(/\*\d+/)
  )
}

const LotParser = (lot_str) => {
  return new Lot(lot_str.split(/\s/).map(RequirementParser));
}

module.exports = {
  LotParser,
  RequirementParser,
}
