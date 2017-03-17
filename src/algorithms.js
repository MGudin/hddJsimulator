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
    return 'SSTF';
  }
}


class CLOOK extends FCFS
{
  // after pf, keeps old direction
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

    if (context.direction)
    {
      return greater.closest(context.position, new Edge(context.maxTracks));
    } else {
      return smaller.closest(context.position, new Edge(0));
    }
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

class LOOK extends SCAN
{
  // after pf, keeps new direction
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
