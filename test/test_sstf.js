'use strict';

const root_dir    = '../'
const test        = require('tape');
const SSTF        = require(`${root_dir}src/algorithms.js`).SSTF;
const lib_sim     = require(`${root_dir}src/simulation.js`);
const PageFault   = lib_sim.PageFault;
const Requirement = lib_sim.Requirement;


function Context() {
  return {
    unattended: {
      pageFaults : [],
      requirements : [
        new Requirement(500),
        new Requirement(300),
        new Requirement(400)
      ],
    },
    direction: false,
    position: 250
  }
}

test('SSTF returns closest requirement available', assert => {
  let context = Context();
  let step = SSTF.next(context);

  assert.equals(step.requirement.equals(new Requirement(300)), true);

  // test next step
  context.unattended.requirements = [new Requirement(400), new Requirement(500)];
  step = SSTF.next(context);
  assert.equals(step.requirement.equals(new Requirement(400)), true);

  assert.end();
});
