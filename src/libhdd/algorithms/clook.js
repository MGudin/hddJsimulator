'use strict';

import LOOK from './look';

class CLOOK extends LOOK
{
    className()
    {
        return 'CLOOK';
    }

    static getNextRequirement(context)
    {
        let [greater, smaller] = this.splitRequirements(
            context.unattended.requirements,
            context.position
        );

        let dir = context.originalDir ? context.originalDir : context.direction;
        let req;

        if (dir) {
            if (greater.isEmpty()) {
                req = smaller.closest(0).toEdge();
            } else {
                req = greater.closest(context.position);
            }
        } else {
            if (smaller.isEmpty()) {
                req = greater.closest(context.maxTracks).toEdge();
            } else {
                req = smaller.closest(context.position);
            }
        }
        return req;
    }

    static countMovements(requirement, context)
    {
        return requirement.edge ? 0 : super.countMovements(requirement, context);
    }
}

export default CLOOK;
