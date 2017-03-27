'use strict';

class Requirement
{

    constructor(value, isPageFault = false, edge=false)
    {
        this.value = value;
        this.isPageFault = isPageFault;
        this.edge = edge;
    }

    equals(other)
    {
        return this.toString() === other.toString();
    }

    valueOf()
    {
        return this.value
    }

    toEdge()
    {
        return new Edge(this.value);
    }

    toString()
    {
        return `${this.isPageFault ? '*' : ''}${this.value}`;
    }
}

class PageFault extends Requirement
{
    constructor(value)
    {
        super(value, true, false);
    }

}

class Edge extends Requirement
{
    constructor(value)
    {
        super(value, false, true);
    }
}

class Lot
{

    constructor(reqs = [])
    {
        this.requirements = reqs;
    }

    append(req)
    {
        this.requirements = [].concat.apply(this.requirements, [req]);
    }

    size()
    {
        return this.requirements.length;
    }

    toArray()
    {
        return this.requirements;
    }

    first()
    {
        return this.requirements.shift();
    }

    last()
    {
        return this.requirements.pop();
    }

    remove(other)
    {
        return this.requirements = this.requirements.filter(req => !req.equals(other));
    }

    at(index)
    {
        return this.requirements[index];
    }

    equals(other)
    {

        if (this.size() !== other.size()) { return false };

        return this.toArray().every((req, index) => other.at(index).equals(req));
    }

    isEmpty()
    {
        return this.size() === 0;
    }

    closest(position, default_next)
    {
        let abs = Math.abs;

        if (this.isEmpty()) return default_next;

        return this.toArray().reduce((previous, current) => {
            return (abs(previous - position) < abs(current - position)) ? previous : current
        })
    }

    toString()
    {
        return this.requirements.map((r) => r.toString()).join(' ');
    }

}

class Hdd
{
    constructor(params)
    {
        // Set default hdd values
        var defaultValues = {
            name:      'Sample Hdd',
            tracks:    512,
            rpm:       5400,
            seek_time: 500
        }
        Object.assign(this, defaultValues)
        // Updates default values with params
        Object.assign(this, params)
    }
}

class LotsBatch
{
    constructor(lots = [])
    {
        this.lots = lots;
    }

    hasLots()
    {
        return this.lots.length > 0;
    }

    next()
    {
        return this.lots.shift();
    }
}


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
    Edge,
}
