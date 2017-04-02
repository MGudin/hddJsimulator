'use strict';

class Hdd
{
    constructor(params)
    {
        // Set default hdd values
        var defaultValues = {
            name:      'Sample Hdd',
            tracks:    512,
            rpm:       5400,
            seek_time: 500
        }
        Object.assign(this, defaultValues)
        // Updates default values with params
        Object.assign(this, params)
    }

    toString()
    {
        return JSON.stringify(this.toJson());
    }

    toJson()
    {
        return this;
    }

    static fromJson(json)
    {
        return new Hdd(json);
    }

    static fromString(json_str)
    {
        return Hdd.fromJson(JSON.parse(json_str));
    }
}

export default Hdd;
