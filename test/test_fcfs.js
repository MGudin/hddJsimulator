'use strict';

const root_dir    = '../'
const test        = require('tape');
const FCFS        = require(`${root_dir}src/algorithms.js`).FCFS;
const PageFault   = require(`${root_dir}src/simulation.js`).PageFault;
const Requirement = require(`${root_dir}src/simulation.js`).Requirement;
const Lot         = require(`${root_dir}src/simulation.js`).Lot;
const Simulation  = require(`${root_dir}src/simulation.js`).Simulation;
const parsers     = require(`${root_dir}src/parsers.js`);
const Scheduler   = require(`${root_dir}src/scheduler.js`).Scheduler;
const LotParser   = parsers.LotParser;
const examples    = require('./examples.js');


function SimpleScheduler() {
  return new Scheduler(FCFS, new Simulation());
}

function Context() {
  return {
    unattended: {
      pageFaults : new Lot([]),
      requirements : new Lot([
        new Requirement(300),
        new Requirement(400)
      ]),
    },
    direction: true,
    position: 250
  }
}

test('FCFS returns first requirement when no PFs present', assert => {

  let context = Context();

  let next = FCFS.next(context).requirement;
  assert.equals(next.equals(new Requirement(300)), true);

  // Test next step
  context.unattended = {requirements: new Lot([new Requirement(400)]), pageFaults: new Lot([])}

  next = FCFS.next(context).requirement;
  assert.equals(next.equals(new Requirement(400)), true);

  assert.end();
});


test('FCFS test returned state is correct (with page faults)', assert => {

  let context = Context();
  context.unattended.pageFaults = new Lot([ new PageFault(350) ]);

  let step = FCFS.next(context)

  assert.equals(step.requirement.equals(new PageFault(350)), true)
  assert.equals(step.direction, true)
  assert.equals(step.movements, 100)

  // Now we test it changes direction
  context = Context();
  context.unattended.pageFaults = new Lot([ new PageFault(350) ]);
  context.position = 400;
  step = FCFS.next(context)

  assert.equals(step.requirement.equals(new PageFault(350)), true)
  assert.equals(step.direction, false)
  assert.equals(step.movements, 50)

  assert.end();
});


test('FCFS test returned state is correct (without page faults)', assert => {

  let context = Context();

  let step = FCFS.next(context)

  assert.equals(step.requirement.equals(new Requirement(300)), true)
  assert.equals(step.direction, true)
  assert.equals(step.movements, 50)


  // Now we test it changes direction
  context = Context();
  context.position = 400;
  step = FCFS.next(context)

  assert.equals(step.requirement.equals(new Requirement(300)), true)
  assert.equals(step.direction, false)
  assert.equals(step.movements, 100)
  assert.end();
});

// TODO: maybe test final state as a whole instead of testing
// every final state property?
test('FCFS#run - single lot - final context', assert => {
  
  let scheduler = SimpleScheduler()
  let lot = LotParser('126 147 81 277 94 150 212 17 140 225 280 50 99 118 22 55');
  let expected = LotParser('126 147 81 277 94 150 212 17 140 225 280 50 99 118 22 55');
  
  scheduler.context.unattended.requirements = lot

  let results = scheduler.run();
  for (const step of results) 
  {
    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.direction, true)
  assert.equals(scheduler.context.movements, 1595)
  
  assert.end();
});


test('FCFS#run - lots batch - final context', assert => {

  let scheduler = new Scheduler(FCFS, examples.simulation14());
  let expected = LotParser('126 147 81 277 94 150 212 175 140 225 280 50 99 118 22 55 75 115 220 266');

  let results = scheduler.run();
  for (const step of results) 
  {
    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.movements, 1451);

  assert.true(scheduler.context.direction);
  
  assert.end();
})
