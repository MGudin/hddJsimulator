'use strict';

const root_dir = '../'
const test     = require('tape');
const sim_lib  = require(`${root_dir}src/simulation.js`);


test('it knows how to get new requirements added', assert => {

  let lot = new sim_lib.Lot();

  assert.equals(typeof lot.add, 'function');
  assert.equals(lot.size(), 0);

  // size should change by one when something is added
  lot.add(5);
  assert.equals(lot.size(), 1);

  assert.end()
});

test('it can add a single number or a list of numbers with same interface', assert => {

  let lot = new sim_lib.Lot();

  assert.equals(lot.size(), 0);

  lot.add(5);
  assert.equals(lot.size(), 1);

  lot.add([9, 8, 7]);
  assert.equals(lot.size(), 4);

  let expected = [5, 9, 8, 7];

  lot.requirements.forEach((req, i) => {
    assert.equals(req, expected[i]);
  });

  assert.end()
});

