'use strict';

const root_dir          = '../'
const test              = require('tape');
const sim_lib           = require(`${root_dir}src/simulation.js`);
const Lot               = sim_lib.Lot;
const Requirement       = sim_lib.Requirement;
const PageFault         = sim_lib.PageFault;
const parsers           = require(`${root_dir}src/parsers.js`);
const LotParser         = parsers.LotParser;
const RequirementParser = parsers.RequirementParser;

test('LotParser dismisses trash input', assert => {
    let trash_input = 'some words'
    let expected = new Lot([]);

    let parsed_lot = LotParser(trash_input);
    assert.true(expected.equals(parsed_lot));
    assert.end();
});

test('LotParser dismisses extra whitespaces', assert => {
    let input = '  54 77   *45   ';
    let expected = new Lot([
        new Requirement(54),
        new Requirement(77),
        new PageFault(45),
    ]);

    let parsed_lot = LotParser(input);
    assert.true(expected.equals(parsed_lot));
    assert.end();
});

test('LotParser dismisses nonsense data inbetween', assert => {
    let input = ' why o why 54 77 some  *45   ';
    let expected = new Lot([
        new Requirement(54),
        new Requirement(77),
        new PageFault(45),
    ]);

    let parsed_lot = LotParser(input);
    assert.true(expected.equals(parsed_lot));
    assert.end();
});
