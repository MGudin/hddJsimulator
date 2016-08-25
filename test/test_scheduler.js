'use strict';
const root_dir = '../'
const test     = require('tape');
require('babel-polyfill');

const alg_lib    = require(`${root_dir}src/algorithms.js`);
const Simulation = require(`${root_dir}src/simulation.js`).Simulation;
const Scheduler  = require(`${root_dir}src/scheduler.js`).Scheduler;


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

  let simulation = new Simulation();
  let method     = new alg_lib.FCFS;
  let scheduler  = new Scheduler(method, simulation);

  assert.equals(typeof scheduler.context, 'object');
  assert.equals(typeof scheduler.method, 'object');

  assert.end();
});

test('Scheduler basic interface', assert => {
  let simulation = new Simulation();
  let method     = new alg_lib.FCFS;
  let scheduler  = new Scheduler(method, simulation);

  assert.equals(typeof scheduler.steps, 'function');
  assert.equals(typeof scheduler.run, 'function');

  assert.end();
});

test('Scheduler steps returns a generator', assert => {

  let simulation = new Simulation();
  let method     = new alg_lib.FCFS;
  let scheduler  = new Scheduler(method, simulation);
  let generator  = scheduler.steps();

  assert.equals(typeof generator, 'object');
  assert.equals(typeof generator.next, 'function');

  assert.end();
});

test('Scheduler `run` returns a results object', assert => {

  let simulation = new Simulation();
  let method     = new alg_lib.FCFS;
  let scheduler  = new Scheduler(method, simulation);
  let results    = scheduler.run();

  assert.equals(typeof results, 'object');

  assert.end();
});
