'use strict';

const root_dir = '../'
const test = require('tape');
const sim_lib = require(`${root_dir}src/simulation.js`);
const alg_lib = require(`${root_dir}src/algorithms.js`);


test('Scheduler constructor requires method and simulation', assert => {
  assert.plan(3);
  assert.throws(
    () => { new sim_lib.Scheduler()},
    'method is required'
  );

  assert.throws(
    () => { new sim_lib.Scheduler('a_method')},
    'simulation is required'
  );

  assert.doesNotThrow(
    () => { new sim_lib.Scheduler('a_method', 'a_simulation')}
  );
});

test('scheduler instance variables are beeing set', assert => {
  assert.plan(9);
  
  let simulation = new sim_lib.Simulation();
  let method = new alg_lib.FCFS();

  let scheduler = new sim_lib.Scheduler(method, simulation);

  assert.equals(typeof scheduler.method, 'object');
  assert.equals(typeof scheduler.direction, 'boolean');
  assert.equals(typeof scheduler.movements, 'number');
  assert.equals(typeof scheduler.attendedRequirements, 'object');
  assert.equals(typeof scheduler.position, 'number');

  // check that instance variables has correct values according to simulation
  assert.true(scheduler.direction);
  assert.equals(scheduler.movements, 0);
  assert.equals(scheduler.position, 0);
  assert.equals(scheduler.method.className(), 'FCFS');
});

// test('scheduler instance variables values are beeing set according to simulation',
//      assert => {
//        asser.plan(1);
       
//      });

