'use strict';

import test from 'tape';
import {Lot, Requirement, PageFault} from '../src/libhdd';

const str = json => JSON.stringify(json) ;

test('Lot objects can be compared', assert => {

    let lot  = new Lot([new Requirement(2)]);
    let other_lot = new Lot([new PageFault(2)]);
    let empty_lot = new Lot();

    assert.true(lot.equals(lot));
    assert.false(lot.equals(empty_lot));
    assert.false(lot.equals(other_lot));

    assert.end();
});

test('Lot#size returns actual amount of requirements in the lot', assert => {

    let empty_lot  = new Lot();
    let non_empty_lot = Lot.fromString('*3 78 54')

    assert.equals(empty_lot.size(), 0);
    assert.equals(non_empty_lot.size(), 3);

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

test('Lot knows how to add new requirements', assert => {

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
    let empty_lot = new Lot();
    let non_empty_lot = Lot.fromString('*3 78 54');

    assert.true(empty_lot.isEmpty());
    assert.false(non_empty_lot.isEmpty());

    assert.end();
});

test('Lot#toString', assert => {
    let expected = '*55 44 33';
    let non_empty_lot = Lot.fromString(expected);
    let empty_lot = new Lot();


    assert.equals(empty_lot.toString(), '');
    assert.equals(non_empty_lot.toString(), expected);

    assert.end();
});

test('Lot#toJson', assert => {

    let expected  = str(['*55', '44', '33']);
    let non_empty_lot       = Lot.fromString('*55 44 33');
    let empty_lot = new Lot();


    assert.equals(str(empty_lot.toJson()), '[]');
    assert.equals(str(non_empty_lot.toJson()), expected);

    assert.end();
});


test('Lot.fromString dismisses trash input', assert => {
    let trash_input = 'some words'
    let expected = new Lot();

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
    assert.true(parsed_lot.equals(expected));

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
    assert.true(parsed_lot.equals(expected));

    assert.end();
});
