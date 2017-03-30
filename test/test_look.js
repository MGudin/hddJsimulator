'use strict';

const root_dir    = '../'
const test        = require('tape');
const LOOK        = require(`${root_dir}src/algorithms.js`).LOOK;
const lib_sim     = require(`${root_dir}src/simulation.js`);
const PageFault   = lib_sim.PageFault;
const Requirement = lib_sim.Requirement;
const Lot         = lib_sim.Lot;
const Scheduler   = require(`${root_dir}src/scheduler.js`).Scheduler;
const examples    = require('./examples');

test('LOOK#run - single lot - final context', assert => {

  let scheduler = new Scheduler(LOOK, examples.simulation12());
  let expected = Lot.fromString('86 91 94 102 115 120 130 147 150 175 177 66 58 32');

  let results = scheduler.run();

  for (let step of results)
  {
    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.direction, false);
  assert.equals(scheduler.context.movements, 239);

  assert.end();
});


test('LOOK#run - lots batch - final context', assert => {

  let scheduler = new Scheduler(LOOK, examples.simulation14());
  let expected = Lot.fromString(
    '147 150 175 212 220 225 266 277 280 ' +
    '140 126 118 115 99 94 81 75 55 50 22'
  );

  let results = scheduler.run();
  for (let step of results)
  {
    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.movements, 395);
  assert.false(scheduler.context.direction);

  assert.end();
});

test('LOOK#run - batch with pagefaults - final context', assert => {

  let scheduler = new Scheduler(LOOK, examples.simulation15());
  let expected = Lot.fromString(
    '*147 175 *150 133 *149 186 201 202 212 257 270 285 288 ' +
    '130 110 99 94 85 81 75 59 50 42 25'
  );

  let results = scheduler.run();

  for (let step of results)
  {
    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.direction, false);
  assert.equals(scheduler.context.movements, 495);
  assert.end();
});
