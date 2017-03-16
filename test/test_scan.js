'use strict';

const root_dir    = '../'
const test        = require('tape');
const SCAN        = require(`${root_dir}src/algorithms.js`).SCAN;
const lib_sim     = require(`${root_dir}src/simulation.js`);
const PageFault   = lib_sim.PageFault;
const Requirement = lib_sim.Requirement;
const Lot         = lib_sim.Lot;
const Scheduler   = require(`${root_dir}src/scheduler.js`).Scheduler;
const examples    = require('./examples');
const parsers     = require(`${root_dir}src/parsers.js`);
const LotParser   = parsers.LotParser;

test('SCAN#run - single lot - final context', assert => {

  let scheduler = new Scheduler(SCAN, examples.simulation12());
  let expected = LotParser('86 91 94 102 115 120 130 147 150 175 177 66 58 32');

  let results = scheduler.run();

    console.log(results);
  for (let step of results)
  {
    assert.true(step.requirement.equals(expected.first()));
  }

  assert.equals(scheduler.context.direction, false);
  assert.equals(scheduler.context.movements, 280);

  assert.end();
});

test('splitRequirements', assert => {

  let lot = LotParser('86 91 94 102 115 120 130 147 150 175 177 66 58 32');
  let greater = SCAN.splitRequirements(lot, 83);
  console.log(greater.greater)
  assert.end();
});

// test('SCAN#run - lots batch - final context', assert => {
//
//   let scheduler = new Scheduler(SCAN, examples.simulation14());
//   let expected = LotParser(
//     '140 147 150 126 118 115 99 94 81 75 55 ' +
//     '50 22 175 212 220 225 266 277 280'
//   );
//
//
//   let results = scheduler.run();
//   for (let step of results)
//   {
//     assert.true(step.requirement.equals(expected.first()));
//   }
//
//   assert.equals(scheduler.context.movements, 399);
//
//   assert.true(scheduler.context.direction);
//
//   assert.end();
// })
//
// test('SCAN#run - batch with pagefaults - final context', assert => {
//     let scheduler = new Scheduler(SCAN, examples.simulation15());
//     let expected = LotParser(
//         '*147 133 130 110 *150 *149 175 186 201 202 212 257 270 ' +
//         '285 288 99 94 85 81 75 59 50 42 25'
//     );
//     let results = scheduler.run();
//
//     for (let step of results)
//     {
//         assert.true(step.requirement.equals(expected.first()));
//     }
//
//     assert.equals(scheduler.context.direction, false);
//     assert.equals(scheduler.context.movements, 487);
//     assert.end();
// })
