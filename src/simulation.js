'use strict';

import {algorithms} from './algorithms';

class Requirement
{

  constructor(value, is_pf = false)
  {
    this.value = value;
    this.is_pf = is_pf;
  }

}

class PageFault extends Requirement
{
  constructor(value)
  {
    super(value, true);
  }

}

class Lot
{

  constructor(reqs = [])
  {
    this.requirements = reqs;
  }

  add(req)
  {
    this.requirements.push(req);
  }

}

class Hdd
{
  constructor(
    name      = 'Sample Hdd',
    tracks    = 512,
    rpm       = 5400,
    seek_time = 500
  )
  {
    this.name      = name;
    this.tracks    = tracks;
    this.rpm       = rpm;
    this.seek_time = seek_time;
  }
}

class Simulation
{

  constructor(
    name      = 'Sample Simulation',
    direction = true,
    position  = 0,
    hdd       = new Hdd(),
    lots      = []
  )
  {
    this.name      = name;
    this.direction = direction;
    this.position  = position;
    this.hdd       = hdd;
    this.lots      = lots;
  }

  run(algorithm) {

    if (typeof algorithm === 'undefined') 
    {
      throw new Error("Cannot run without algorithm");
    }
  }

}


export {
  Simulation,
  Hdd,
  algorithms
}

