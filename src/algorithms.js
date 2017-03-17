'use strict';

const PageFault = require(`./simulation.js`).PageFault;
const Requirement = require(`./simulation.js`).Requirement;
const Edge = require(`./simulation.js`).Edge;
const Lot = require(`./simulation.js`).Lot;
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
    return context.unattended.requirements.closest(context.position);
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
  // goes to the edges
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

  className()
  {
    return 'SCAN';
  }
}
class CSCAN extends FCFS
{
  // after pf, keeps old direction
  className()
  {
    return 'CSCAN';
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
