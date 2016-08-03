'use strict';

const root_dir = '../'
const test = require('tape');
const algorithms = require(`${root_dir}src/algorithms.js`);




test('it exports algorithm constants', (assert) => {

  let requiredConstants = [
    'FCFS',
    'SSTF',
  ];

  assert.plan(requiredConstants.length);

  for (let constant of requiredConstants)
  {
    assert.equal(typeof algorithms[constant], 'function');
  }

});
