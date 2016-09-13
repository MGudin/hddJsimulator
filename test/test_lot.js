'use strict';

const root_dir    = '../'
const test        = require('tape');
const sim_lib     = require(`${root_dir}src/simulation.js`);
const Lot         = sim_lib.Lot;
const Requirement = sim_lib.Requirement;
const PageFault   = sim_lib.PageFault;

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

test('Lot objects can be compared', assert => {

  let lot  = new Lot([new Requirement(2)]);
  let lot2 = new Lot([new PageFault(2)]);

  assert.true(lot.equals(new Lot([new Requirement(2)])));
  assert.false(lot.equals(new Lot()));
  assert.false(lot.equals(lot2));

  assert.end();
});

test('Lot#size returns actual amount of requirements in the lot', assert => {

  let lot  = new Lot();
  let lot2 = LotParser('*3 78 54')

  assert.equals(lot.size(), 0);
  assert.equals(lot2.size(), 3);

  assert.end();
});


test('Lot#at returns requirement at a given index', assert => {

  let lot = LotParser('3 4 *34');
  let req = new Requirement(4);
  let pf  = new PageFault(34);

  assert.true(lot.at(1).equals(req));
  assert.true(lot.at(2).equals(pf));

  assert.end();
});

test('Lot#remove actually removes given requirement ', assert => {

  let lot         = LotParser('3 4 *34');
  let returnValue = lot.remove(new Requirement(4))

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

  let lot = new Lot();

  assert.equals(typeof lot.append, 'function');
  assert.equals(lot.size(), 0);

  // size should change by one when something is added
  lot.append(new Requirement(5));
  assert.equals(lot.size(), 1);

  assert.end()
});

test('Lot#append can receive array of requirements', assert => {

  let lot = new Lot();

  lot.append([
    new Requirement(9),
    new Requirement(8),
    new Requirement(7),
  ]);

  assert.equals(lot.size(), 3);
  assert.true(lot.equals(LotParser('9 8 7')));

  assert.end()
});
