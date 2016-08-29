'use strict';

const root_dir = '../'
const test = require('tape');
const Requirement = require(`${root_dir}src/simulation.js`).Requirement;
const PageFault = require(`${root_dir}src/simulation.js`).PageFault;



test('test Requirement#equals', assert => {
  
  let requirement = new Requirement(100);
  let equalRequirement = new Requirement(100);
  let differentRequirement = new Requirement(200)
  let pageFault = new PageFault(100)
  let equalPageFault = new PageFault(100)
  let differentPageFault = new PageFault(200)
  
  assert.equals(requirement.equals(equalRequirement), true)
  assert.equals(requirement.equals(differentRequirement), false)

  assert.equals(requirement.equals(PageFault), false)
  assert.equals(pageFault.equals(equalPageFault), true)
  assert.equals(pageFault.equals(differentPageFault), false)
  assert.end();
});
