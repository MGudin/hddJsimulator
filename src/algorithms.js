'use strict';

const PageFault = require(`./simulation.js`).PageFault;
const Requirement = require(`./simulation.js`).Requirement;

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

    return {
      direction,
      requirement,
      movements,
      position: requirement.valueOf()
    }

  }

  static getNextRequirement(context)
  {
    // to be overwritten by subclasses
    return context.unattended.requirements.at(0);
  }

  static countMovements(requirement, context)
  {
    let currentPosition = context.position;
    let attendedRequirement = requirement;

    return Math.abs(currentPosition - attendedRequirement);
  }

  static getFinalDirection(requirement, context)
  {
    return requirement > context.position;
  }

}

const getClosestRequirementFn = (position) => {
  return (previous, current) => {
    let abs = Math.abs;
    return (abs(previous - position) < abs(current - position)) ? previous : current
  };
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


  static getNextRequirement(context)
  {
    let position = context.position;
    return context.unattended.requirements.toArray().reduce(
      getClosestRequirementFn(position)
    );
  }

  className()
  {
    return 'SSTF'
  }
}

class LOOK extends FCFS
{
  // after pf, keeps new direction
  className()
  {
    return 'LOOK'
  }
}
class CLOOK extends FCFS
{
  // after pf, keeps old direction
  className()
  {
    return 'CLOOK'
  }
}

class SCAN extends FCFS
{
  // after pf, keeps new direction
  static splitRequirements(requirements, position)
  {
    let greater = [];
    let smaller = [];
    for (let req of requirements.toArray())
    {
      if (req.value > position) {
        greater.push(req)
      } else {
        smaller.push(req)
      }
    }
    return {greater, smaller}
  }

  static getNextRequirement(context)
  {
    let splitReqs = this.splitRequirements(
      context.unattended.requirements,
      context.position
    );
    if (context.direction) {
      return splitReqs.greater.reduce(getClosestRequirementFn(context.position))
    } else {
      return splitReqs.smaller.reduce(getClosestRequirementFn(context.position))
    }
  }

  countMovements(requirement, context)
  {
    let greater, smaller = this.splitRequirements(
      context.unattended.requirements,
      context.position
    );

    let reqs = context.direction ? greater : smaller;

    if (reqs.length > 0)
    {
      return super.countMovements(requirement, context);
    } else {
      return 0;
    }
  }

  className()
  {
    return 'SCAN'
  }
}
class CSCAN extends FCFS
{
  // after pf, keeps old direction
  className()
  {
    return 'CSCAN'
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
