'use strict';

import test from 'tape';
import {
    Lot,
    PageFault,
    Requirement,
    Scheduler,
    algorithms
} from '../src/libhdd';
import examples from './examples';
const CSCAN = algorithms.CSCAN;

test('CSCAN#run - single lot - final context', assert => {

  let scheduler = new Scheduler(CSCAN, examples.simulation12());
  let expected = Lot.fromString('86 91 94 102 115 120 130 147 150 175 177 199 0 32 58 66');


  let results = scheduler.run();
  for (let step of results)
  {

    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.direction, true);
  assert.equals(scheduler.context.movements, 182);

  assert.end();
});


test('CSCAN#run - lots batch - final context', assert => {

  let scheduler = new Scheduler(CSCAN, examples.simulation14());
  let expected = Lot.fromString('147 150 175 212 220 225 266 277 280 299 0 22 50 55 75 81 94 99 115 118 126 140');

  let results = scheduler.run();
  for (let step of results)
  {
    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.movements, 296);
  assert.true(scheduler.context.direction);

  assert.end();
});

test('CSCAN#run - batch with pagefaults - final context', assert => {

  let scheduler = new Scheduler(CSCAN, examples.simulation15());
  let expected = Lot.fromString(
    '*147 175 *150 186 *149 201 202 212 257 270 285 288 299 '+
    '0 25 42 50 59 75 81 85 94 99 110 130 133'
  );

  let results = scheduler.run();
  for (let step of results)
  {
    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.direction, true);
  assert.equals(scheduler.context.movements, 416);
  assert.end();
});
