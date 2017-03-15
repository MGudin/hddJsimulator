'use strict';

const root_dir   = '../'
const test       = require('tape');
const algorithms = require(`${root_dir}src/algorithms.js`);
const PageFault  = require(`${root_dir}src/simulation.js`).PageFault;
const Lot        = require(`${root_dir}src/simulation.js`).Lot;


const requiredConstants = [
  'FCFS',
  'SSTF',
  'CSCAN',
  'SCAN',
  'LOOK',
  'CLOOK'
];

var Context = function ()
{
  return {
    unattended: {
      pageFaults: new Lot([
        new PageFault(300),
        new PageFault(400)
      ]),
      requirements: new Lot([]),
    }
  }
}



for (let constant of requiredConstants)
{

  let Algorithm = algorithms[constant];

  test(`${constant} exports algorithm constants`, assert => {


    assert.equal(typeof Algorithm, 'function');

    assert.end();
  });

  test(`${constant} have same interface for next`, assert => {

    let Method = Algorithm;
    let context = Context();

    // ensure all algorithms understand `next`
    assert.equal(typeof Method.next, 'function');
    // ensure all algorithms return an object
    assert.equal(typeof Method.next(context), 'object');

    assert.end()
  });


  test(`${constant} algorithm returns pf if present`, assert => {

    let context = Context();
    let next = Algorithm.next(context)
    assert.equals(next.requirement.isPageFault, true);

    let next_context = {unattended: { pageFaults: new Lot([new PageFault(400)]), requirements:  new Lot([])}};
    next = Algorithm.next(next_context).requirement;
    assert.equals(next.equals(new PageFault(400)), true);

    assert.end();
  });


  test(`${constant} algorithm returns the first page fault available`, assert => {

    let context = Context();
    let next = Algorithm.next(context)
    assert.equals(next.requirement.equals(new PageFault(300)), true)

    assert.end();
  });

  test(`${constant}#next returns results object with proper interface`, assert => {
    let context = Context();
    let result = Algorithm.next(context);

    assert.equals(typeof result.direction,   'boolean');
    assert.equals(typeof result.position,    'number');
    assert.equals(typeof result.requirement, 'object');
    assert.equals(typeof result.movements,   'number');
    // TODO: check if classes can return custom typeof

    assert.end();
  });

  test(`${constant}#className returns correct name`, assert => {
    assert.equals(new Algorithm().className(), constant);
    assert.end();
  });

} // end for
