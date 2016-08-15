'use strict';

const root_dir = '../'
const test = require('tape');
const algorithms = require(`${root_dir}src/algorithms.js`);

const requiredConstants = [
  'FCFS',
  'SSTF',
  'CSCAN',
  'SCAN',
  'LOOK',
  'CLOOK'
];

test('it exports algorithm constants', assert => {

  assert.plan(requiredConstants.length);

  for (let constant of requiredConstants)
  {
    assert.equal(typeof algorithms[constant], 'function');
  }

});

test('All algorithms have same interface for `nextRequirement`', assert => {

  let context = {
    pageFaults: [1, 56],
    unattended: [4, 67]
  };

  assert.plan(requiredConstants.length * 2);

  for (let constant of requiredConstants)
  {
    let Method = algorithms[constant];

    // ensure all algorithms understand `nextRequirement`
    assert.equal(typeof Method.nextRequirement, 'function');
    // ensure all algorithms return an object
    assert.equal(typeof Method.nextRequirement(context), 'object');
  }

});
