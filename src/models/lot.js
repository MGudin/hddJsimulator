var Lot = require('../simulation').Lot;

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
