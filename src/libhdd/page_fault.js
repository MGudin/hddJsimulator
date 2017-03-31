'use strict';

import Requirement from './requirement';

class PageFault extends Requirement
{
    constructor(value)
    {
        super(value, true, false);
    }
}

export default PageFault;
