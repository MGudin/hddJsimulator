'use strict';

import FCFS from './fcfs';

class SSTF extends FCFS
{
    className()
    {
        return 'SSTF';
    }

    static getNextRequirement(context)
    {
        return context.unattended.requirements.closest(context.position);
    }
}

export default SSTF;
