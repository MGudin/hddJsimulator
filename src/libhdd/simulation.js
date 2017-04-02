'use strict';

import Hdd from './hdd';
import LotsBatch from './lots_batch';

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

export default Simulation;
