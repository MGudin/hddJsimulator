import {LotsBatch as Batch} from '../libhdd';

let batch = {
  lots: [],
  addLotInput: vnode => {
    batch.lots.push(vnode)
  },
  construct: () => {
    return new Batch(batch.lots)
  }
}

export default batch;
