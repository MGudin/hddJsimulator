'use strict';

import SCAN from './scan';

class LOOK extends SCAN
{
    className()
    {
        return 'LOOK'
    }

    static getNextRequirement(context)
    {
        let [greater, smaller] = this.splitRequirements(
            context.unattended.requirements,
            context.position
        );

        if (context.direction)
        {
            return greater.closest(context.position, smaller.closest(context.position));
        } else {
            return smaller.closest(context.position, greater.closest(context.position));
        }
    }
}

export default LOOK;
