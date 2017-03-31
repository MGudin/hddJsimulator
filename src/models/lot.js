var Lot = require('../lot');

var lot  = {
  unparsed: '',
  setUnparsed: (string) => {
    lot.unparsed = string
  },
  parse: () => Lot.fromString(lot.unparsed)
  
};

module.exports={
  lot,
}
