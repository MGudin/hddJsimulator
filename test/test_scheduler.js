'use strict';
const root_dir = '../'
const test     = require('tape');
require('babel-polyfill');

const FCFS       = require(`${root_dir}src/algorithms.js`).FCFS;
const Simulation = require(`${root_dir}src/simulation.js`).Simulation;
const Scheduler  = require(`${root_dir}src/scheduler.js`).Scheduler;


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
  assert.equals(scheduler.context.attended.length, 0);
  assert.equals(scheduler.context.unattended.page_faults.length, 0);
  assert.equals(scheduler.context.unattended.requirements.length, 0);
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
