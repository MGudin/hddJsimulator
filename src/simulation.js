'use strict';

const Requirement = require('./requirement');
const Edge = require('./edge');
const PageFault = require('./page_fault');
const Lot = require('./lot');
const LotsBatch = require('./lots_batch');
const Hdd = require('./hdd');

class Simulation
{

    constructor(params)
    {
        // Set default simulation values
        var defaultValues = {
            name:      'Sample Simulation',
            direction: true,
            position:  0,
            hdd:       new Hdd(),
            lotsBatch:  new LotsBatch()
        };
        Object.assign(this, defaultValues);
        // Updates default values with params
        Object.assign(this, params);
    }

}

module.exports = {
    Simulation,
    LotsBatch,
    Hdd,
    Lot,
    Requirement,
    PageFault,
    Edge
}
