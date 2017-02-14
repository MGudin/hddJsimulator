'use strict';
const root_dir = '../'
const test     = require('tape');
require('babel-polyfill');

const FCFS        = require(`${root_dir}src/algorithms.js`).FCFS;
const Scheduler   = require(`${root_dir}src/scheduler.js`).Scheduler;
const lib_sim     = require(`${root_dir}src/simulation.js`);
const Simulation  = lib_sim.Simulation;
const LotsBatch   = lib_sim.LotsBatch;
const Requirement = lib_sim.Requirement;
const PageFault   = lib_sim.PageFault;
const Lot         = lib_sim.Lot;
const parsers     = require(`${root_dir}src/parsers.js`);
const LotParser   = parsers.LotParser;


function SimpleScheduler() {
  return new Scheduler(FCFS, new Simulation());
}

test('Scheduler constructor requires Method and Context', assert => {

  assert.throws(
    () => { new Scheduler() },
    'A Method is required'
  );

  assert.throws(
    () => { new Scheduler('a_method') },
    'A Context is required'
  );

  assert.doesNotThrow(
    () => { new Scheduler('a_method', new Simulation()) }
  );

  assert.end();
});

test('Scheduler instance variables are beeing set', assert => {

  let scheduler  = SimpleScheduler();

  assert.equals(typeof scheduler.context, 'object');
  assert.equals(typeof scheduler.method, 'function');
  assert.equals(typeof scheduler.context.lots, 'object');
  
  assert.equals(scheduler.context.direction, true);
  assert.equals(scheduler.context.position, 0);
  assert.equals(scheduler.context.movements, 0);
  assert.equals(scheduler.context.attended.size(), 0);
  assert.equals(scheduler.context.unattended.pageFaults.size(), 0);
  assert.equals(scheduler.context.unattended.requirements.size(), 0);
  // assert.equals(scheduler.context.lots.length, 0);
  assert.equals(scheduler.context.maxTracks, 512);

  assert.end();
});

test('Scheduler basic interface', assert => {

  let scheduler  = SimpleScheduler();

  assert.equals(typeof scheduler.steps, 'function');
  assert.equals(typeof scheduler.run, 'function');

  assert.end();
});

test('Scheduler#steps returns a generator', assert => {

  let scheduler  = SimpleScheduler();
  let generator  = scheduler.steps();

  assert.equals(typeof generator, 'object');
  assert.equals(typeof generator.next, 'function');

  assert.end();
});

test('Scheduler#run returns a results object', assert => {

  let scheduler  = SimpleScheduler();
  let results    = scheduler.run();

  assert.equals(typeof results, 'object');

  assert.end();
});

test('Scheduler#updateContext', assert => {

  let scheduler = SimpleScheduler();
  let req       = new Requirement(300);
  let nextReq   = new Requirement(100);

  scheduler.context.movementsUntilNextLot = 500;
  scheduler.updateContext({
    requirement: req,
    direction:   true,
    movements:   300,
    position:    300,
  });

  assert.equals(scheduler.context.attended.size(), 1);
  assert.equals(scheduler.context.direction, true);
  assert.equals(scheduler.context.movements, 300);
  assert.equals(scheduler.context.position, 300);
  assert.equals(scheduler.context.movementsUntilNextLot, 200);

  scheduler.updateContext({
    requirement: nextReq,
    direction:   false,
    movements:   200,
    position:    200,
  });

  assert.equals(scheduler.context.attended.size(), 2);
  assert.equals(scheduler.context.direction, false);
  assert.equals(scheduler.context.movements, 500);
  assert.equals(scheduler.context.position, 200);
  assert.equals(scheduler.context.movementsUntilNextLot, 0);
  
  assert.end();
});

test('Scheduler#updateContext merges lots when movementsUntilNextLot', assert => {

  assert.end()
})

test('Scheduler#mergeLot updates unattended lots', assert => {
// tests unattended.{pageFaults,rewquirements}.length is addded
  assert.end();
})

test('Scheduler#mergeLot updates movementsUntilNextLot', assert => {
  let batchLot = new LotsBatch(
    [
      { lot: LotParser('3 4 5'), movementsUntilNextLot: 100 }
    ]
  )
  
  let scheduler = SimpleScheduler();
  scheduler.mergeLot(batchLot.next())

  // by default SimplesSheduler has movementsUntilNextLot = 0

  assert.equal(scheduler.context.movementsUntilNextLot, 100);

  assert.end();
})

test('Scheduler#addUnattended', assert => {
  //test it adds requirement to corresponding list

  
  assert.end();
})
