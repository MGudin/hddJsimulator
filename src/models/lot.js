var Lot.fromString = require('../parsers').Lot.fromString

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
