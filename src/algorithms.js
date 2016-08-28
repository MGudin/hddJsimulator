'use strict';

const PageFault = require(`./simulation.js`).PageFault;
const Requirement = require(`./simulation.js`).Requirement;

class BaseAlgorithm
{

  static next(context)
  {
    let req;

    if (context.unattended.pageFaults.length > 0)
    {
      req = context.unattended.pageFaults[0];
    } else {
      req = context.unattended.requirements[0];
    }

    return {
      direction: true,
      requirement: req,
      movements: 0,
      position: req.value
    }

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
