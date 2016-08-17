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

}

class Scheduler
{
  constructor(
    method,
    context
  )
  {
    if (typeof method === 'undefined')
    {
      throw new Error('A Method is Required');
    }
    if (typeof context === 'undefined')
    {
      throw new Error('A Context is Required');
    }

    this.method = method;
    this.context = context;

  }

  * runInSteps(context)
  {

    if (!typeof context === 'undefined')
    {
      this.updateContext(context);
    }

    while (this.hasUnattendedReqs())
    {
      next = this.method.nextStep(this.context);
      this.updateContext(next);
      yield this.context;
    }
  }

  run() {
    return [...this.runInSteps()];
  }

}

module.exports = {
  Simulation,
  Hdd,
  Scheduler,
}
