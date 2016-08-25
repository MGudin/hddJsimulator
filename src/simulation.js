'use strict';

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

  constructor(params = {
    name: 'Sample Simulation',
    direction: true,
    position: 0,
    hdd: new Hdd(),
    lots: []
  })
  {
    this.name      = params.name;
    this.direction = params.direction;
    this.position  = params.position;
    this.hdd       = params.hdd;
    this.lots      = params.lots;
  }

}

module.exports = {
  Simulation,
  Hdd,
  Lot,
  Requirement,
  PageFault,
}
