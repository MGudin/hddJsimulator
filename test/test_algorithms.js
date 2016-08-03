'use strict';

const root_dir = '../'
const test = require('tape');
const algorithms = require(`${root_dir}src/algorithms.js`);




test('it exports algorithm constants', function (t) {

  let requiredConstants = [
    'FCFS',
    'SSTF',
  ];

  t.plan(requiredConstants.length);

  for (let constant of requiredConstants) 
  {
    t.equal(typeof algorithms[constant], 'function');
  }

});
