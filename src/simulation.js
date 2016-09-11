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

  first()
  {
    return this.requirements.shift();
  }

  last()
  {
    return this.requirements.pop();
  }

  remove(requirement)
  {
    for (let i = 0, length = this.size(); i < length; i++)
    {
      if (requirement.equals(this.requirements[i]))
      {
        this.requirements.splice(i, 1);
        return true;
      }
    }
    return false;
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
      lots:      []
    };
    Object.assign(this, defaultValues);
    // Updates default values with params
    Object.assign(this, params);
  }

}

module.exports = {
  Simulation,
  Hdd,
  Lot,
  Requirement,
  PageFault,
}
