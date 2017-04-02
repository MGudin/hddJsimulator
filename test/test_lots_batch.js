'use strict';

import test from 'tape';
import { Lot, LotsBatch } from '../src/libhdd';

const str = json => JSON.stringify(json) ;

test('LotsBatch#toJson on empty batch', assert => {
    let expected  = '{"lots":[]}';
    let batch = new LotsBatch();

    assert.equals(str(batch.toJson()), expected);

    assert.end();
});

test('LotsBatch#toJson on batch with empty Lot', assert => {
    let expected  = '{"lots":[{"lot":[],"movementsUntilNextLot":0}]}';
    let batch = new LotsBatch([{lot: new Lot(), movementsUntilNextLot: 0}]);

    assert.equals(str(batch.toJson()), expected);

    assert.end();
});

test('LotsBatch#toJson on non empty batch', assert => {
    let expected  = '{"lots":[{"lot":["*33","44"],"movementsUntilNextLot":0}]}';
    let batch = new LotsBatch([{lot: Lot.fromString('*33 44'), movementsUntilNextLot: 0}]);

    assert.equals(str(batch.toJson()), expected);

    assert.end();
});

test('LotsBatch#fromJson on non empty batch', assert => {
    let expected  = '{"lots":[{"lot":["*33","44"],"movementsUntilNextLot":0}]}';
    let batch = LotsBatch.fromJson(JSON.parse(expected));

    assert.equals(str(batch.toJson()), expected);

    assert.end();
});

test('LotsBatch#toJson => fromJson full circle', assert => {

    let batch = new LotsBatch([{lot: Lot.fromString('*33 44'), movementsUntilNextLot: 0}]);
    let expected = str(batch.toJson());
    let parsed_batch = LotsBatch.fromJson(batch.toJson());

    assert.equals(expected, str(parsed_batch.toJson()));

    assert.end();
});

test('LotsBatch#fromJson without `movementsUntilNextLot`', assert => {

    let batch = new LotsBatch([{lot: Lot.fromString('*33 44')}]);
    let expected = str(batch.toJson());
    let parsed_batch = LotsBatch.fromJson(batch.toJson());

    assert.equals(expected, str(parsed_batch.toJson()));
    assert.end();
});
