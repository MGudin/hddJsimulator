'use strict';

const root_dir = '..';
// const Lot = require(`${root_dir}/src/simulation.js`).Lot;
const Lot = require('./simulation').Lot;
// const Requirement = require(`${root_dir}/src/simulation.js`).Requirement;
const Requirement = require('./simulation').Requirement;

const RequirementParser = (req_str) => {
    //==========================================================================
    // Parses strings into requirements, to define a Page Fault an asterisk (*)
    // must be  prepended to the number.
    // Example:
    //          let pageFault = RequirementParser('*34');  #=> PageFault(34)
    //          let requirement = RequirementParser('5');  #=> Requirement(5)
    //==========================================================================
    return new Requirement(
        parseInt(req_str.replace(/\W/, '')),
        !!req_str.match(/\*\d+/)
    )
}

const LotParser = (lot_str) => {
    //==========================================================================
    // Parses string into a Lot
    // Example:
    //  let lot = LotParser('3 *34'); #=> Lot([Requirement(3), PageFault(34)])
    //==========================================================================

    let clean_data = lot_str.replace(/\s+/g, ' ')
        .split(/\s/)
        .filter(v => v.match(/\*?\d+/));
    return new Lot(clean_data.map(RequirementParser));
}

module.exports = {
    LotParser,
    RequirementParser,
}
