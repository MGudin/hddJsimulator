import { Lot } from '../libhdd';

let lot  = {
    unparsed: '',
    setUnparsed: string => {
        lot.unparsed = string
    },
    parse: () => Lot.fromString(lot.unparsed)
};

export default lot;
