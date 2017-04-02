'use strict';

import test from 'tape';
import {
    Lot,
    LotsBatch,
    Hdd,
    PageFault,
    Requirement,
    Scheduler,
    Simulation,
    algorithms
} from '../src/libhdd';
import examples from './examples';
const FCFS = algorithms.FCFS;

// TODO: reformat as all other algorithm tests

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
  let lot = Lot.fromString('126 147 81 277 94 150 212 17 140 225 280 50 99 118 22 55');
  let expected = Lot.fromString('126 147 81 277 94 150 212 17 140 225 280 50 99 118 22 55');

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
  let expected = Lot.fromString('126 147 81 277 94 150 212 175 140 225 280 50 99 118 22 55 75 115 220 266');

  let results = scheduler.run();
  for (const step of results)
  {
    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.movements, 1451);

  assert.true(scheduler.context.direction);

  assert.end();
})

test('FCFS#run - single lot with page faults - final context', assert => {


  let lotBatch = new LotsBatch(
    [
      { lot: Lot.fromString('126 147 *81 277 94 150 212 17 *140 *225 280 50 99 118 22 55') }
    ]
  );

  let hdd = new Hdd({tracks:300});

  let simulation = new Simulation(
    {
      hdd: hdd,
      lotsBatch: lotBatch
    }
  );

  let scheduler = new Scheduler(FCFS, simulation);

  let expected = Lot.fromString('*81 *140 *225 126 147 277 94 150 212 17 280 50 99 118 22 55');



  let results = scheduler.run();
  for (let step of results)
  {
    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.direction, true)
  assert.equals(scheduler.context.movements, 1661)

  assert.end();
})

test('FCFS#run - batch with pagefaults - final context', assert => {
  let scheduler = new Scheduler(FCFS, examples.simulation15());
  let expected = Lot.fromString('*147 99 *150 *149 110 42 25 186 270 50 81 257 94 133 212 175 130 85 202 288 75 285 201 59')
  let results = scheduler.run();

  for (let step of results)
  {
    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.direction, false);
  assert.equals(scheduler.context.movements, 2163);
  assert.end();
})
