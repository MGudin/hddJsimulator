'use strict';

const root_dir  = '../'
const test      = require('tape');
const sim_lib   = require(`${root_dir}src/simulation.js`);
const Lot       = sim_lib.Lot;
const LotsBatch = sim_lib.LotsBatch;

test('LotsBatch#toJson on empty batch', assert => {
    let expected  = '{"lots":[]}';
    let batch = new LotsBatch();

    assert.equals(JSON.stringify(batch.toJson()), expected);

    assert.end();
});

test('LotsBatch#toJson on batch with empty Lot', assert => {
    let expected  = '{"lots":[{"lot":[],"movementsUntilNextLot":0}]}';
    let batch = new LotsBatch([{lot: new Lot(), movementsUntilNextLot: 0}]);

    assert.equals(JSON.stringify(batch.toJson()), expected);

    assert.end();
});

test('LotsBatch#toJson on non empty batch', assert => {
    let expected  = '{"lots":[{"lot":["*33","44"],"movementsUntilNextLot":0}]}';
    let batch = new LotsBatch([{lot: Lot.fromString('*33 44'), movementsUntilNextLot: 0}]);

    assert.equals(JSON.stringify(batch.toJson()), expected);

    assert.end();
});

test('LotsBatch#fromJson on non empty batch', assert => {
    let expected  = '{"lots":[{"lot":["*33","44"],"movementsUntilNextLot":0}]}';
    let batch = LotsBatch.fromJson(JSON.parse(expected));

    assert.equals(JSON.stringify(batch.toJson()), expected);

    assert.end();
});

test('LotsBatch#toJson => fromJson full circle', assert => {

    let batch = new LotsBatch([{lot: Lot.fromString('*33 44'), movementsUntilNextLot: 0}]);
    let expected = JSON.stringify(batch.toJson());
    let parsed_batch = LotsBatch.fromJson(batch.toJson());

    assert.equals(expected, JSON.stringify(parsed_batch.toJson()));

    assert.end();
});
