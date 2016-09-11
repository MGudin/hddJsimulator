'use strict';

const root_dir = '../'
const test     = require('tape');
const sim_lib  = require(`${root_dir}src/simulation.js`);
const Lot      = sim_lib.Lot;
const Requirement = sim_lib.Requirement;

// helpers that some day may become utils
const RequirementParser = (req_str) => {

  return new Requirement(
    parseInt(req_str.replace(/\W/, '')),
    !!req_str.match(/\*\d+/)
  )
}

const LotParser = (lot_str) => {
  return new Lot(lot_str.split(/\s/).map(RequirementParser));
}
// ------------------------------------------

test('Lot#equals method  ', assert => {

  let lot = new sim_lib.Lot([new sim_lib.Requirement(2)]); // [2]
  let lot2 = new sim_lib.Lot([new sim_lib.PageFault(2)]); // [*2]
  
  assert.true(lot.equals(new sim_lib.Lot([new sim_lib.Requirement(2)])));

  assert.false(lot.equals(new sim_lib.Lot()));
  assert.false(lot.equals(lot2));

  assert.end();
});

test('Lot#size', assert => {
  
  let lot = new Lot();
  let lot2= LotParser('*3 78 54')
  
  assert.equals(lot.size(), 0);
  assert.equals(lot2.size(), 3);
  assert.end();
});


test('Lot#at', assert => {
  
  let lot = LotParser('3 4 *34');
  let req = new Requirement(4);
  let pf = new Requirement(34, true);
  
  assert.true(lot.at(1).equals(req));
  assert.true(lot.at(2).equals(pf));

  assert.end();
});

test('Lot#remove actually removes given requirement ', assert => {
  let lot = LotParser('3 4 *34');
  let returnValue =  lot.remove(new Requirement(4))

  assert.true(lot.equals(LotParser('3 *34')));
  
  assert.end();
});

test('Lot#remove returns operation success/failure', assert => {
  let lot = LotParser('3 4 *34');
  
  assert.true(lot.remove(new Requirement(4)));
  assert.false(lot.remove(new Requirement(44)));

   assert.end();
});

test('it knows how to get new requirements added', assert => {

  let lot = new sim_lib.Lot();

  assert.equals(typeof lot.append, 'function');
  assert.equals(lot.size(), 0);

  // size should change by one when something is added
  lot.append(new Requirement(5));
  assert.equals(lot.size(), 1);

  assert.end()
});

test('Lot#append receives single requirement or array', assert => {

  let lot = new sim_lib.Lot();

  lot.append(new Requirement(5));
  assert.equals(lot.size(), 1);

  lot.append(
    [new Requirement(9),
     new Requirement(8),
     new Requirement(7)]
  );
  assert.equals(lot.size(), 4);

  assert.true(lot.equals(LotParser('5 9 8 7')));

  assert.end()
});

