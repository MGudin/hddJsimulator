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
const SCAN = algorithms.SCAN;

test('SCAN#run - single lot - final context', assert => {

  let scheduler = new Scheduler(SCAN, examples.simulation12());
  let expected = Lot.fromString('86 91 94 102 115 120 130 147 150 175 177 199 66 58 32');

  let results = scheduler.run();

  for (let step of results)
  {
    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.direction, false);
  assert.equals(scheduler.context.movements, 283);

  assert.end();
});

test('SCAN#splitRequirements returns propper object', assert => {

  let lot = Lot.fromString('86 147 91 177 94 150 102 175 130 32 120 58 66 115');
  let expected_greater = Lot.fromString('86 147 91 177 94 150 102 175 130 120 115');
  let expected_smaller = Lot.fromString('32 58 66');
  let [greater, smaller] = SCAN.splitRequirements(lot, 83);

  assert.equals(typeof greater, 'object');
  assert.equals(typeof smaller, 'object');

  assert.true(greater.equals(expected_greater));
  assert.true(smaller.equals(expected_smaller));

  assert.end();
});

test('SCAN#run - lots batch - final context', assert => {

  let scheduler = new Scheduler(SCAN, examples.simulation14());
  let expected = Lot.fromString(
    '147 150 175 212 220 225 266 277 280 299 ' +
    '140 126 118 115 99 94 81 75 55 50 22'
  );

  let results = scheduler.run();
  for (let step of results)
  {
    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.movements, 433);
  assert.false(scheduler.context.direction);

  assert.end();
})

test('SCAN#run - batch with pagefaults - final context', assert => {
  let scheduler = new Scheduler(SCAN, examples.simulation15());
  let expected = Lot.fromString(
    '*147 175 *150 133 *149 186 201 202 212 257 270 285 288 299 ' +
    '130 110 99 94 85 81 75 59 50 42 25'
  );

  let results = scheduler.run();

  for (let step of results)
  {
    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.direction, false);
  assert.equals(scheduler.context.movements, 517);
  assert.end();
})
