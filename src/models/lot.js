import { Lot } from '../libhdd';

let lot  = {
    // for testing pourposes unparsed is
    // filled with testcase
    unparsed: '100 *250 300 50 400 390',
    setUnparsed: string => {
        lot.unparsed = string
    },
    parse: () => Lot.fromString(lot.unparsed)
};

export default lot;
