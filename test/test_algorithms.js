'use strict';
import {test} from 'tape';


import * as algorithms from '../src/algorithms.js';

const requiredConstants = [
  'FCFS',
  'SSTF',
  'CSCAN',
  'SCAN',
  'LOOK',
  'CLOOK'
];

test('it exports algorithm constants', assert => {

  for (let constant of requiredConstants)
  {
    assert.equal(typeof algorithms[constant], 'function');
  }

  assert.end();
});

test('All algorithms have same interface for `next`', assert => {

  let context = {
    pageFaults: [1, 56],
    unattended: [4, 67]
  };

  for (let constant of requiredConstants)
  {
    let Method = algorithms[constant];

    // ensure all algorithms understand `next`
    assert.equal(typeof Method.next, 'function');
    // ensure all algorithms return an object
    assert.equal(typeof Method.next(context), 'object');
  }

    assert.end();
});
