'use strict';

require('babel-polyfill');
const root_dir  = '../'
const test      = require('tape');
const sim_lib   = require(`${root_dir}src/simulation.js`);
const alg_lib   = require(`${root_dir}src/algorithms.js`);
const sched_lib = require(`${root_dir}src/scheduler.js`);


test('Scheduler constructor requires method and simulation', assert => {

  assert.throws(
    () => { new sched_lib.Scheduler() },
    'A Method is required'
  );

  assert.throws(
    () => { new sched_lib.Scheduler('a_method') },
    'A Context is required'
  );

  assert.doesNotThrow(
    () => { new sched_lib.Scheduler('a_method', 'a_context') }
  );

  assert.end();
});

test('scheduler instance variables are beeing set', assert => {

  let simulation = new sim_lib.Simulation();
  let method     = new alg_lib.FCFS;
  let scheduler  = new sched_lib.Scheduler(method, simulation);

  assert.equals(typeof scheduler.context, 'object');
  assert.equals(typeof scheduler.method, 'object');

  assert.end();
});
