'use strict';

const root_dir    = '../'
const test        = require('tape');
const SSTF        = require(`${root_dir}src/algorithms.js`).SSTF;
const lib_sim     = require(`${root_dir}src/simulation.js`);
const PageFault   = lib_sim.PageFault;
const Requirement = lib_sim.Requirement;
const Lot         = lib_sim.Lot;
const Scheduler   = require(`${root_dir}src/scheduler.js`).Scheduler;
const examples    = require('./examples');
const parsers     = require(`${root_dir}src/parsers.js`);
const LotParser   = parsers.LotParser;

function Context() {
  return {
    unattended: {
      pageFaults : new Lot([]),
      requirements : new Lot([
        new Requirement(500),
        new Requirement(300),
        new Requirement(400)
      ]),
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
  context.unattended.requirements = new Lot([new Requirement(400), new Requirement(500)]);
  step = SSTF.next(context);
  assert.equals(step.requirement.equals(new Requirement(400)), true);

  assert.end();
});


test('SSTF#run - single lot - final context', assert => {
  
  let scheduler = new Scheduler( SSTF, examples.simulation12);
  // let lot = LotParser('86 147 91 177 94 150 102 175 130 32 120 58 66 115');
  let expected = LotParser('86 91 94 102 115 120 130 147 150 175 177 66 58 32')
  
  let results = scheduler.run();
  
  for (const step of results) 
  {
    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.direction, false);
  assert.equals(scheduler.context.movements, 239);
  
  assert.end();
});
