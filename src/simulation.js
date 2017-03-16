'use strict';

class Requirement
{

  constructor(value, isPageFault = false)
  {
    this.value = value;
    this.isPageFault = isPageFault;
  }

  equals(other)
  {
    return this.value === other.value &&
      this.isPageFault === other.isPageFault
  }

  valueOf()
  {
    return this.value
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

  append(req)
  {
    this.requirements = [].concat.apply(this.requirements, [req]);
  }

  size()
  {
    return this.requirements.length;
  }

  toArray()
  {
    return this.requirements;
  }

  first()
  {
    return this.requirements.shift();
  }

  last()
  {
    return this.requirements.pop();
  }

  remove(other)
  {
    let index = 0;
    let removed = false;

    for (let requirement of this.requirements)
    {
      if (other.equals(requirement))
      {
        this.requirements.splice(index, 1);
        removed = true;
      }
      index++;
    }
    return removed;
  }

  at(index)
  {
    return this.requirements[index];
  }

  equals(other)
  {

    if (this.size() !== other.size()) { return false };

    for (let i = 0, length = this.size(); i < length; i++)
    {
      if (! this.at(i).equals(other.at(i))) { return false };
    }

    return true;
  }

  isEmpty()
  {
    return this.size() === 0;
  }

}

class Hdd
{
  constructor(params)
  {
    // Set default hdd values
    var defaultValues = {
      name:      'Sample Hdd',
      tracks:    512,
      rpm:       5400,
      seek_time: 500
    }
    Object.assign(this, defaultValues)
    // Updates default values with params
    Object.assign(this, params)
  }
}

class LotsBatch
{
  constructor(lots = [])
  {
    this.lots = lots;
  }

  hasLots()
  {
    return this.lots.length>0;
  }

  next()
  {
    return this.lots.shift();
  }
}


class Simulation
{

  constructor(params)
  {
    // Set default simulation values
    var defaultValues = {
      name:      'Sample Simulation',
      direction: true,
      position:  0,
      hdd:       new Hdd(),
      lotsBatch:  new LotsBatch()
    };
    Object.assign(this, defaultValues);
    // Updates default values with params
    Object.assign(this, params);
  }

}

module.exports = {
  Simulation,
  LotsBatch,
  Hdd,
  Lot,
  Requirement,
  PageFault,
}
