
class Requirement
{

  constructor(value)
  {
    this.value = value;
  }

}

class PageFault extends Requirement
{
  constructor(value)
  {
    super(value);
    this.is_pf = true;
  }

}

class Lot
{

  constructor(reqs)
  {
    this.requirements = reqs || [];
  }

}
