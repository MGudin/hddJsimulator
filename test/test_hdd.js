'use strict';

import test from 'tape';
import { Hdd } from '../src/libhdd';

test('Hdd#toJson', assert => {
    let hdd = new Hdd();
    let expected = '{"name":"Sample Hdd","tracks":512,"rpm":5400,"seek_time":500}'

    assert.equals(expected, JSON.stringify(hdd.toJson()));
    assert.end();
});

test('Hdd#toJson', assert => {
    let hdd = new Hdd();
    let expected = '{"name":"Sample Hdd","tracks":512,"rpm":5400,"seek_time":500}'

    assert.equals(expected, hdd.toString());
    assert.end();
});

test('Hdd#fromString', assert => {
    let json_str = '{"name":"es rapido este","tracks":299,"rpm":5400,"seek_time":500}'
    let hdd = Hdd.fromString(json_str);

    assert.equals(hdd.tracks, 299);
    assert.equals(hdd.name, 'es rapido este');
    assert.end();
});