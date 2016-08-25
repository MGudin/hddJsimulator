'use strict';
const root_dir = '../'
const test     = require('tape');
require('babel-polyfill');

const FCFS       = require(`${root_dir}src/algorithms.js`).FCFS;
const Simulation = require(`${root_dir}src/simulation.js`).Simulation;
const Scheduler  = require(`${root_dir}src/scheduler.js`).Scheduler;


function simpleScheduler() {
  return new Scheduler(FCFS, (new Simulation()));
}

test('Scheduler constructor requires method and simulation', assert => {

  assert.throws(
    () => { new Scheduler() },
    'A Method is required'
  );

  assert.throws(
    () => { new Scheduler('a_method') },
    'A Context is required'
  );

  assert.doesNotThrow(
    () => { new Scheduler('a_method', 'a_context') }
  );

  assert.end();
});

test('scheduler instance variables are beeing set', assert => {

  let scheduler  = simpleScheduler();

  assert.equals(typeof scheduler.context, 'object');
  assert.equals(typeof scheduler.method, 'function');

  assert.end();
});

test('Scheduler basic interface', assert => {

  let scheduler  = simpleScheduler();

  assert.equals(typeof scheduler.steps, 'function');
  assert.equals(typeof scheduler.run, 'function');

  assert.end();
});

test('Scheduler steps returns a generator', assert => {

  let scheduler  = simpleScheduler();
  let generator  = scheduler.steps();

  assert.equals(typeof generator, 'object');
  assert.equals(typeof generator.next, 'function');

  assert.end();
});

test('Scheduler `run` returns a results object', assert => {

  let scheduler  = simpleScheduler();
  let results    = scheduler.run();

  assert.equals(typeof results, 'object');

  assert.end();
});
