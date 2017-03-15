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
    let abs = Math.abs;

    let closestRequirement = (previous, current) => {
      return (abs(previous - position) < abs(current - position)) ? previous : current
    };

    let next =  context.unattended.requirements.toArray().reduce(closestRequirement);

    return next;
  }

  className()
  {
    return 'SSTF'
  }
}

class LOOK extends FCFS
{
  className()
  {
    return 'LOOK'
  }
}
class CLOOK extends FCFS
{
  className()
  {
    return 'CLOOK'
  }
}
class SCAN extends FCFS
{
  className()
  {
    return 'SCAN'
  }
}
class CSCAN extends FCFS
{
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
