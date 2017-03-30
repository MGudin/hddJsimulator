var batch = {
  lots: [],
  addLotInput: (vnode) => {
    batch.lots.push(vnode)
  }
}

module.exports = {
  batch,
}
