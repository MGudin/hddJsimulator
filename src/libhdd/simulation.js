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

    toJson()
    {
        return {
            name: this.name,
            direction: this.direction,
            position: this.position,
            hdd: this.hdd.toJson(),
            lotsBatch:  this.lotsBatch.toJson()
        };
    }

    static fromJson(json)
    {
        return new Simulation({
            name: json.name,
            direction: json.direction,
            position: json.position,
            hdd: Hdd.fromJson(json.hdd),
            lotsBatch: LotsBatch.fromJson(json.lotsBatch)
        });
    }
}

export default Simulation;
