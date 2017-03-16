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
  // goes to the edges
  static splitRequirements(requirements, position)
  {
    let greater = new Lot();
    let smaller = new Lot();
    for (let req of requirements.toArray())
    {
      if (req.value > position) {
        greater.append(req)
      } else {
        smaller.append(req)
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
      if (splitReqs.greater.isEmpty())
      {
        return new Edge(context.maxTracks);
      }else{
        return splitReqs.greater.toArray().reduce(getClosestRequirementFn(context.position))
      }
    } else {
      if (splitReqs.smaller.isEmpty())
      {
        return new Edge(0);
      }else{
        return splitReqs.smaller.toArray().reduce(getClosestRequirementFn(context.position))
      }
    }
  }

  // static countMovements(requirement, context)
  // {
  //   let splitReqs = this.splitRequirements(
  //     context.unattended.requirements,
  //     context.position
  //   );

  //   let reqs = context.direction ? splitReqs.greater : splitReqs.smaller;

  //   if (reqs.toArray().length > 0)
  //   {
  //     return super.countMovements(requirement, context);
  //   } else {
  //     return 0;
  //   }
  // }

  static getFinalDirection(requirement, context)
  {
    let direction = super.getFinalDirection(requirement, context);
    if (requirement.edge)
    {
      return !direction;
    }
    return direction;
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
