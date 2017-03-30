'use strict';

const Requirement = require('./requirement');

class PageFault extends Requirement
{
    constructor(value)
    {
        super(value, true, false);
    }
}

module.exports = PageFault;
