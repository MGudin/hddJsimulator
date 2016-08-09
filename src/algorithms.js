'use strict';

class BaseAlgorithm
{
}

class FCFS extends BaseAlgorithm
{
  
  className()
  {
    return 'FCFS';
  }
}

class SSTF extends BaseAlgorithm
{
  className()
  {
    return 'SSTF'
  }
}

module.exports = {
  FCFS,
  SSTF
}
