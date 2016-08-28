'use strict';

const root_dir = '../'
const test = require('tape');
const FCFS = require(`${root_dir}src/algorithms.js`).FCFS;
const PageFault = require(`${root_dir}src/simulation.js`).PageFault;
const Requirement = require(`${root_dir}src/simulation.js`).Requirement;


const context = {
  unattended: {
    pageFaults : [
    ],
    requirements : [
      new Requirement(300),
      new Requirement(400)
    ],
  }
}

test('FCFS returns first requirement when no PFs present', assert => {
  let next = FCFS.next(context).requirement;
  assert.equals(next.equals(new Requirement(300)), true);

  let next_context = {unattended: {requirements: [new Requirement(400)], pageFaults: []}};
  next = FCFS.next(next_context).requirement;
  assert.equals(next.equals(new Requirement(400)), true);

  assert.end();
});

