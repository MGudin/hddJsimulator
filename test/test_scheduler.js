'use strict';
const root_dir = '../'
const test     = require('tape');
require('babel-polyfill');

const FCFS        = require(`${root_dir}src/algorithms.js`).FCFS;
const Simulation  = require(`${root_dir}src/simulation.js`).Simulation;
const Scheduler   = require(`${root_dir}src/scheduler.js`).Scheduler;
const Requirement = require(`${root_dir}src/simulation.js`).Requirement;
const Lot         = require(`${root_dir}src/simulation.js`).Lot;


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

  assert.equals(scheduler.context.direction, true);
  assert.equals(scheduler.context.position, 0);
  assert.equals(scheduler.context.movements, 0);
  assert.equals(scheduler.context.attended.size(), 0);
  assert.equals(scheduler.context.unattended.pageFaults.size(), 0);
  assert.equals(scheduler.context.unattended.requirements.size(), 0);
  assert.equals(scheduler.context.lots.length, 0);
  assert.equals(scheduler.context.maxTracks, 512);

  assert.end();
});

test('Scheduler basic interface', assert => {

  let scheduler  = SimpleScheduler();

  assert.equals(typeof scheduler.steps, 'function');
  assert.equals(typeof scheduler.run, 'function');

  assert.end();
});

test('Scheduler steps returns a generator', assert => {

  let scheduler  = SimpleScheduler();
  let generator  = scheduler.steps();

  assert.equals(typeof generator, 'object');
  assert.equals(typeof generator.next, 'function');

  assert.end();
});

test('Scheduler `run` returns a results object', assert => {

  let scheduler  = SimpleScheduler();
  let results    = scheduler.run();

  assert.equals(typeof results, 'object');

  assert.end();
});

test('Scheduler#updateContext', assert => {

  let scheduler = SimpleScheduler();
  let req = new Requirement(300);
  let nextReq = new Requirement(100);

  scheduler.updateContext({
    requirement: req,
    direction:   true,
    movements:   300,
    position:    300,
  });

  assert.true(req.equals(scheduler.context.attended.last()));
  assert.equals(scheduler.context.direction, true);
  assert.equals(scheduler.context.movements, 300);
  assert.equals(scheduler.context.position, 300);

  scheduler.updateContext({
    requirement: nextReq,
    direction:   false,
    movements:   200,
    position:    200,
  });

  assert.true(nextReq.equals(scheduler.context.attended.last()));
  assert.equals(scheduler.context.direction, false);
  assert.equals(scheduler.context.movements, 500);
  assert.equals(scheduler.context.position, 200);

  assert.end();
});


test('Scheduler#updateContext moves requirements after attended', assert => {

  // Here we make sure the scheduler removes attended requirements from
  // unattended lots. i.e: a page fault should be removed from the
  // unattended.pageFaults lot whereas a Requirement should be removed from the
  // unattended.requirements lot.

  // TODO: revise this test, maybe testing that a lot does not include the
  // attended requirement instead of testing the whole lot against a new one.

  let scheduler = SimpleScheduler();

  scheduler.context.unattended = {
    requirements: new Lot([new Requirement(3), new Requirement(50)]),
    pageFaults: new Lot([new Requirement(3, true)]),
  };

  let unattended = scheduler.context.unattended

  scheduler.updateContext({
    requirement: new Requirement(3),
    direction:   false,
    movements:   200,
    position:    200,
  });

  assert.true(unattended.requirements.equals(new Lot([new Requirement(50)])));

  scheduler.updateContext({
    requirement: new Requirement(3, true),
    direction:   false,
    movements:   200,
    position:    200,
  });

  assert.true(unattended.pageFaults.equals(new Lot()));

  assert.end();
});
