'use strict';

class BaseAlgorithm
{
    static next(context)
    {
        let requirement;

        if (!context.unattended.pageFaults.isEmpty())
        {
            requirement = context.unattended.pageFaults.first();
        } else {
            requirement = this.getNextRequirement(context);
        }

        let movements = this.countMovements(requirement, context);

        let direction = this.getFinalDirection(requirement, context);

        if (requirement.isPageFault)
        {
            if (context.originalDir === undefined)
            {
                context.originalDir = context.direction;
            }
        } else {
            if (context.originalDir !== undefined)
            {
                delete context.originalDir;
            }
        }

        return {
            direction,
            requirement,
            movements,
            position: requirement.valueOf(),
            originalDir: context.originalDir
        }

    }


    static getNextRequirement(context)
    {
        // to be overwritten by subclasses
        return context.unattended.requirements.at(0);
    }

    static countMovements(requirement, context)
    {
        return Math.abs(context.position - requirement.value);
    }

    static getFinalDirection(requirement, context)
    {
        return requirement > context.position;
    }

}

export default BaseAlgorithm;
