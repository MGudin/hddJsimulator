var Batch = require('../lots_batch');

var batch = {
  lots: [],
  addLotInput: (vnode) => {
    batch.lots.push(vnode)
  },
  construct: () => {
   return new Batch(batch.lots)
  }
}

module.exports = {
  batch,
}
