'use strict';

const sim_lib     = require('./simulation');
const PageFault   = sim_lib.PageFault;
const Requirement = sim_lib.Requirement;
const Edge        = sim_lib.Edge;
const Lot         = sim_lib.Lot;

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

class FCFS extends BaseAlgorithm
{
    className()
    {
        return 'FCFS';
    }
}

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


class SCAN extends FCFS
{
    className()
    {
        return 'SCAN';
    }

    static splitRequirements(requirements, position)
    {
        let greater = new Lot();
        let smaller = new Lot();
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


class CSCAN extends CLOOK
{
    className()
    {
        return 'CSCAN';
    }

    static getNextRequirement(context)
    {
        let [greater, smaller] = this.splitRequirements(
            context.unattended.requirements,
            context.position
        );

        let dir = context.originalDir ? context.originalDir : context.direction;
        let lastReq = context.attended.at(context.attended.size() - 1);
        let nextReq;

        if (dir) {
            if (greater.isEmpty()) {
                if (lastReq.value === context.maxTracks)
                {
                    nextReq = new Edge(0);
                } else {
                    nextReq = new Requirement(context.maxTracks);
                }
            } else {
                nextReq = greater.closest(context.position);
            }
        } else {
            if (smaller.isEmpty()) {
                if (lastReq.value === 0)
                {
                    nextReq = new Edge(context.maxTracks);
                } else {
                    nextReq = new Requirement(0);
                }
            } else {
                nextReq = smaller.closest(context.position);
            }
        }
        return nextReq;
    }
}

module.exports = {
    FCFS,
    SSTF,
    LOOK,
    CLOOK,
    SCAN,
    CSCAN
}
