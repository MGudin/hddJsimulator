'use strict';

import FCFS from './fcfs';
import Lot from '../lot';
import Edge from '../edge';

class SCAN extends FCFS
{
    className()
    {
        return 'SCAN';
    }

    static splitRequirements(requirements, position)
    {
        let greater = new Lot(), smaller = new Lot();
        for (let req of requirements.toArray())
        {
            (req.value > position) ? greater.append(req) : smaller.append(req)
        }
        return [greater, smaller];
    }

    static getNextRequirement(context)
    {
        let [greater, smaller] = this.splitRequirements(
            context.unattended.requirements,
            context.position
        );

        if (context.direction)
        {
            return greater.closest(context.position, new Edge(context.maxTracks));
        } else {
            return smaller.closest(context.position, new Edge(0));
        }
    }

    static getFinalDirection(requirement, context)
    {
        let direction = super.getFinalDirection(requirement, context);
        return requirement.edge ? !direction : direction;
    }
}

export default SCAN;
