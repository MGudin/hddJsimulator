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
        return new Requirement(this.value, this.isPageFault, true);
    }

    toString()
    {
        return `${this.isPageFault ? '*' : ''}${this.value}`;
    }

    toJson()
    {
        return this.toString();
    }

    static fromString(req_str)
    {
        return new Requirement(
            parseInt(req_str.replace(/\W/, '')),
            !!req_str.match(/\*\d+/)
        );
    }

    static fromJson(json)
    {
        return Lot.fromString(json);
    }
}

module.exports = Requirement;
