'use strict';

const PageFault = require(`./simulation.js`).PageFault;


class FCFS
{
  static next(context)
  {
    return {
      requirement : new PageFault(300)
    }
  }

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
