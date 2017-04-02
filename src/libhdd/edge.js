'use strict';

import Requirement from './requirement';

class Edge extends Requirement
{
    constructor(value)
    {
        super(value, false, true);
    }
}

export default Edge;
