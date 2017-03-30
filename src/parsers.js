'use strict';

const root_dir = '..';
// const Lot = require(`${root_dir}/src/simulation.js`).Lot;
const Lot = require('./simulation').Lot;
// const Requirement = require(`${root_dir}/src/simulation.js`).Requirement;
const Requirement = require('./simulation').Requirement;

const Requirement.fromString = (req_str) => {
    //==========================================================================
    // Parses strings into requirements, to define a Page Fault an asterisk (*)
    // must be  prepended to the number.
    // Example:
    //          let pageFault = Requirement.fromString('*34');  #=> PageFault(34)
    //          let requirement = Requirement.fromString('5');  #=> Requirement(5)
    //==========================================================================
    // Deprecated
    return Requirement.fromString(req_str);
}

const Lot.fromString = (lot_str) => {
    //==========================================================================
    // Parses string into a Lot
    // Example:
    //  let lot = Lot.fromString('3 *34'); #=> Lot([Requirement(3), PageFault(34)])
    //==========================================================================
    // Deprecated
    return Lot.fromString(lot_str);
}

module.exports = {
    Lot.fromString,
    Requirement.fromString,
}
