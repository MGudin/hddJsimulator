'use strict';

const root_dir          = '../'
const test              = require('tape');
const sim_lib           = require(`${root_dir}src/simulation.js`);
const Lot               = sim_lib.Lot;
const Requirement       = sim_lib.Requirement;
const PageFault         = sim_lib.PageFault;

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
  let lot2 = Lot.fromString('*3 78 54')

  assert.equals(lot.size(), 0);
  assert.equals(lot2.size(), 3);

  assert.end();
});


test('Lot#at returns requirement at a given index', assert => {

  let lot = Lot.fromString('3 4 *34');
  let req = new Requirement(4);
  let pf  = new PageFault(34);

  assert.true(lot.at(1).equals(req));
  assert.true(lot.at(2).equals(pf));

  assert.end();
});

test('Lot#remove actually removes given requirement ', assert => {

  let lot         = Lot.fromString('3 4 *34');
  let returnValue = lot.remove(new Requirement(4))

  assert.true(lot.equals(Lot.fromString('3 *34')));

  assert.end();
});

test('Lot#remove removes all appearances of given requirement', assert => {

  let lot = Lot.fromString('3 4 *34 4');
  let expected = Lot.fromString('3 *34')

  lot.remove(4)
  assert.true(lot.equals(expected));

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
  assert.true(lot.equals(Lot.fromString('9 8 7')));

  assert.end()
});

test('Lot#first returns first available requirement', assert => {
  let lot = Lot.fromString('*3 78 54')

  assert.true(lot.first().equals(new PageFault(3)));

  assert.end();
});

test('Lot#last returns last available requirement', assert => {
  let lot = Lot.fromString('*3 78 54')

  assert.true(lot.last().equals(new Requirement(54)));

  assert.end();
});


test('Lot knows wether its empty or not', assert => {
  let lot = new Lot();

  assert.true(lot.isEmpty());

  lot.append(new Requirement(3))
  assert.false(lot.isEmpty());

  assert.end();
});

test('Lot#toString', assert => {
    let expected = '*55 44 33';
    let lot = Lot.fromString(expected);


    assert.equals((new Lot()).toString(), '');
    assert.equals(lot.toString(), expected);

    assert.end();
});

test('Lot#toJson', assert => {

    let expected  = JSON.stringify(['*55', '44', '33']);
    let lot       = Lot.fromString('*55 44 33');
    let empty_lot = new Lot();


    assert.equals(JSON.stringify(empty_lot.toJson()), '[]');
    assert.equals(JSON.stringify(lot.toJson()), expected);

    assert.end();
});


test('Lot.fromString dismisses trash input', assert => {
    let trash_input = 'some words'
    let expected = new Lot([]);

    let parsed_lot = Lot.fromString(trash_input);
    assert.true(expected.equals(parsed_lot));

    assert.end();
});

test('Lot.fromString dismisses extra whitespaces', assert => {
    let input = '  54 77   *45   ';
    let expected = new Lot([
        new Requirement(54),
        new Requirement(77),
        new PageFault(45)
    ]);

    let parsed_lot = Lot.fromString(input);
    assert.true(expected.equals(parsed_lot));

    assert.end();
});

test('Lot.fromString dismisses nonsense data inbetween', assert => {
    let input = ' why o why 54 77 some  *45   ';
    let expected = new Lot([
        new Requirement(54),
        new Requirement(77),
        new PageFault(45)
    ]);

    let parsed_lot = Lot.fromString(input);
    assert.true(expected.equals(parsed_lot));

    assert.end();
});
