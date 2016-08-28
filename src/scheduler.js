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
    this.context.attended = [];
    this.context.unattended = {
      pageFaults: [],
      requirements: []
    };
    this.context.lots = context.lots;

  }

  * steps()
  {
    while (this.hasUnattendedReqs())
    {
      yield step
    }
  }
  run() {
    let state = {};

    return state;
  }
}

module.exports = {
  Scheduler
}
