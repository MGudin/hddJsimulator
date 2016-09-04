'use strict';

const root_dir = '../'
const test = require('tape');
const FCFS = require(`${root_dir}src/algorithms.js`).FCFS;
const PageFault = require(`${root_dir}src/simulation.js`).PageFault;
const Requirement = require(`${root_dir}src/simulation.js`).Requirement;


function Context() {
  return {
    unattended: {
      pageFaults : [],
      requirements : [
        new Requirement(300),
        new Requirement(400)
      ],
    },
    direction: true,
    position: 250
  }
}

test('FCFS returns first requirement when no PFs present', assert => {

  let context = Context();

  let next = FCFS.next(context).requirement;
  assert.equals(next.equals(new Requirement(300)), true);

  // Test next step
  context.unattended = {requirements: [new Requirement(400)], pageFaults: []}

  next = FCFS.next(context).requirement;
  assert.equals(next.equals(new Requirement(400)), true);

  assert.end();
});


test('FCFS test returned state is correct (with page faults)', assert => {

  let context = Context();
  context.unattended.pageFaults = [ new PageFault(350) ];

  let step = FCFS.next(context)

  assert.equals(step.requirement.equals(new PageFault(350)), true)
  assert.equals(step.direction, true)
  assert.equals(step.movements, 100)

  // Now we test it changes direction
  context.position = 400;
  step = FCFS.next(context)

  assert.equals(step.requirement.equals(new PageFault(350)), true)
  assert.equals(step.direction, false)
  assert.equals(step.movements, 50)

  assert.end();
});


test('FCFS test returned state is correct (without page faults)', assert => {

  let context = Context();

  let step = FCFS.next(context)

  assert.equals(step.requirement.equals(new Requirement(300)), true)
  assert.equals(step.direction, true)
  assert.equals(step.movements, 50)


  // Now we test it changes direction
  context.position = 400;
  step = FCFS.next(context)

  assert.equals(step.requirement.equals(new Requirement(300)), true)
  assert.equals(step.direction, false)
  assert.equals(step.movements, 100)
  assert.end();
});
