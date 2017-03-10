'use strict';

const root_dir = '../';

const Lot = require('./simulation').Lot;
const Requirement = require('./simulation').Requirement;

class Scheduler
{

  constructor(method, context)
  {
    if (typeof method === 'undefined')
    {
      throw new Error('A Method is Required');
    }
    if (typeof context === 'undefined')
    {
      throw new Error('A Context is Required');
    }

    this.method  = method;

    this.initial_context = context;

    this.context = {};
    this.context.maxTracks = context.hdd.tracks;
    this.context.direction = context.direction;
    this.context.position = context.position;
    this.context.movements = 0;
    this.context.attended =  new Lot();
    this.context.unattended = {
      pageFaults: new Lot(),
      requirements: new Lot()
    };

    this.context.movementsUntilNextLot = 0;
    this.context.lots = context.lotsBatch;
    if (this.context.lots.hasLots())
    {
      this.mergeLot(this.lotsBatch.next());
    }

  }

  updateContext(step)
  {
    this.context.direction = step.direction;
    this.context.position = step.position;
    this.context.movements += step.movements;
    this.context.movementsUntilNextLot -= step.movements;
    this.context.attended.append(step.requirement);
    while (this.context.movementsUntilNextLot <= 0 && this.context.lots.hasLots())
    {
      this.mergeLot(this.context.lots.next());
    }
  }

  mergeLot (nextLot)
  {
    this.context.movementsUntilNextLot += nextLot.movementsUntilNextLot;
    nextLot.lot.toArray().forEach((req) => this.addUnattended(req));
  }

  addUnattended(req)
  {
    if (req.isPageFault)
    {
      this.context.unattended.pageFaults.append(req)
    } else {
      this.context.unattended.requirements.append(req)
    }
  }


  * steps()
  {
    while (this.hasUnattendedReqs())
    {
      next = this.method.next(this.context)
      this.updateContext(next)
      yield next
    }
  }

  hasUnattendedReqs()
  {
    return ! (this.context.unattended.pageFaults.isEmpty() && this.context.unattended.requirements.isEmpty());
  }

  run() 
  {
    return [...this.steps()];
  }
}

module.exports = {
  Scheduler
}
