'use strict';

const root_dir = '../'
const test = require('tape');
const Requirement = require(`${root_dir}src/simulation.js`).Requirement;



test('test Requirement equals', assert => {
  
  let requirement = new Requirement(100);
  let equalRequirement = new Requirement(100);
  

  assert.equals(requirement.equals(equalRequirement), true)
  assert.end();
});
