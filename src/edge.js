'use strict';

const Requirement = require('./requirement');

class Edge extends Requirement
{
    constructor(value)
    {
        super(value, false, true);
    }
}

module.exports = Edge;
