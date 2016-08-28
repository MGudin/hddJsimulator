'use strict';

const root_dir = '../'
const test = require('tape');
const algorithms = require(`${root_dir}src/algorithms.js`);
const PageFault = require(`${root_dir}src/simulation.js`).PageFault;


const requiredConstants = [
  'FCFS',
  'SSTF',
  'CSCAN',
  'SCAN',
  'LOOK',
  'CLOOK'
];

const context = {
  unattended: {
    pageFaults : [
      new PageFault(300),
      new PageFault(400)
    ],
    requirements : [],
  }
}


for (let constant of requiredConstants)
{

  let Algorithm = algorithms[constant];

  test(`${constant} exports algorithm constants`, assert => {


    assert.equal(typeof algorithms[constant], 'function');

    assert.end();
  });

  test(`${constant} have same interface for next`, assert => {

    let Method = algorithms[constant];

    // ensure all algorithms understand `next`
    assert.equal(typeof Method.next, 'function');
    // ensure all algorithms return an object
    assert.equal(typeof Method.next(context), 'object');

    assert.end()
  });


  test(`${constant} algorithm returns pf if present`, assert => {

    let next = algorithms[constant].next(context)
    assert.equals(next.requirement.isPageFault, true);

    let next_context = {unattended: { pageFaults: [new PageFault(400)], requirements: [] }};
    next = algorithms[constant].next(next_context).requirement;
    assert.equals(next.equals(new PageFault(400)), true);

    assert.end();
  });


  test(`${constant} algorithm returns the first page fault available`, assert => {

    let next = algorithms[constant].next(context)
    assert.equals(next.requirement.equals(new PageFault(300)), true)

    assert.end();
  });

  test(`${constant}#next returns results object with proper interface`, assert => {
    let result = Algorithm.next(context);

    assert.equals(typeof result.direction, 'boolean');
    assert.equals(typeof result.position, 'number');
    assert.equals(typeof result.requirement, 'object');
    assert.equals(typeof result.movements, 'number');
    // TODO: check if classes can return custom typeof

    assert.end();
  });

} // end for
