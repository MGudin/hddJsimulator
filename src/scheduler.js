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

    this.method = method;
    this.context = context;

  }

  * steps(context)
  {

    if (!typeof context === 'undefined')
    {
      this.updateContext(context);
    }

    while (this.hasUnattendedReqs())
    {
      next = this.method.next(this.context);
      this.updateContext(next);
      yield this.context;
    }
  }

  run() {
    let state = {};

    // for (step of this.steps())
    // {
    //   state = step;
    // }

    return state;
  }

}

module.exports = {
  Scheduler
}
