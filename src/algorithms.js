'use strict';

const PageFault = require(`./simulation.js`).PageFault;
const Requirement = require(`./simulation.js`).Requirement;

class BaseAlgorithm
{

  static next(context)
  {
    let requirement;

    if (context.unattended.pageFaults.length > 0)
    {
      requirement = context.unattended.pageFaults[0];
    } else {
      requirement = context.unattended.requirements[0];
    }

    let movements = this.countMovements(requirement, context);

    let direction = this.getFinalDirection(requirement, context);
    
    return {
      direction,
      requirement,
      movements,
      position: requirement.value
    }

  }

  static countMovements(requirement, context)
  {
    let currentPosition = context.position;
    let attendedRequirement = requirement;

    return Math.abs( currentPosition - attendedRequirement);
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
    return 'SSTF'
  }
}

class LOOK extends FCFS {}
class CLOOK extends FCFS {}
class SCAN extends FCFS {}
class CSCAN extends FCFS {}

module.exports = {
  FCFS,
  SSTF,
  LOOK,
  CLOOK,
  SCAN,
  CSCAN
}
