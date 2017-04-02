'use strict';

import Lot from './lot';

class LotsBatch
{
    constructor(lots = [])
    {
        this.lots = lots;
    }

    hasLots()
    {
        return this.lots.length > 0;
    }

    next()
    {
        return this.lots.shift();
    }

    lotHolderToJson(lot_holder)
    {
        return {
            lot: lot_holder.lot.toJson(),
            movementsUntilNextLot: lot_holder.movementsUntilNextLot
        }
    }

    toJson()
    {
        return {
            lots: this.lots.map(lot_holder => this.lotHolderToJson(lot_holder))
        };
    }

    static lotHolderFromJson(lot_holder_data)
    {
        return {
            lot: Lot.fromJson(lot_holder_data.lot),
            movementsUntilNextLot: lot_holder_data.movementsUntilNextLot
        }
    }

    static fromJson(json)
    {
        return new LotsBatch(
            json.lots.map(lot_data => LotsBatch.lotHolderFromJson(lot_data))
        )
    }
}

export default LotsBatch;
