'use strict';

const root_dir = '../'
const test = require('tape');
const sim_lib = require(`${root_dir}src/simulation.js`);


// test('Simulation can `run` with desired algorithm', assert => {
//   assert.plan(1);
//   let simulation = new sim_lib.Simulation();
//   assert.equal(typeof simulation.run, 'function');
// });

// test('`Simulation.run` requires algorithm argument', assert => {
//   assert.plan(2);
//
//   let simulation = new sim_lib.Simulation();
//
//   assert.throws(
//     () => { simulation.run() },
//     'Cannot run without algorithm'
//   );
//
//   assert.doesNotThrow(
//     () => { simulation.run('ssss') },
//     'Cannot run without algorithm'
//   );
// })
