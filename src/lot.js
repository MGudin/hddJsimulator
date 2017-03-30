'use strict';

const Requirement = require('./requirement');

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
        return this.toArray().map((r) => r.toString()).join(' ');
    }

    toJson()
    {
        return this.toArray().map(req => req.toJson());
    }

    static fromString(lot_str)
    {
        let clean_data = lot_str.replace(/\s+/g, ' ')
            .split(/\s/)
            .filter(v => v.match(/\*?\d+/));
        return new Lot(clean_data.map(Requirement.fromString));
    }

    static fromJson(json)
    {
        return new Lot(json.map(req_str => Requirement.fromString(req_str)));
    }

}

module.exports = Lot;
