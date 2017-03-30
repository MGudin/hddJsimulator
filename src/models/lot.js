var LotParser = require('../parsers').LotParser

var lot  = {
  unparsed: '',
  setUnparsed: (string) => {
    lot.unparsed = string
  },
  parse: () => LotParser(lot.unparsed)
};

module.exports={
  lot,
}
