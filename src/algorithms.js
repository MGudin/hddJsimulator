'use strict';

class FCFS
{
  static next(context)
  {
    return {};
  }

  className()
  {
    return 'FCFS';
  }
}

class SSTF
{
  static next(context)
  {
    return {};
  }

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
