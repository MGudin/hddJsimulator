'use strict';

require('babel-polyfill');

const root_dir = '../';

const m                 = require('mithril');
const lib_sim           = require('./simulation');
const algorithms        = require('./algorithms');
const scheduler         = require('./scheduler');
const examples          = require('./../test/examples');
const parsers           = require('./parsers');
const LotParser         = parsers.LotParser;
const RequirementParser = parsers.RequirementParser;

let simulation = examples.simulation12();
let sched = new scheduler.Scheduler(algorithms.SCAN, simulation);

// application imports
var Home = require('./components/home').Home;
var SimulationForm = require('./components/simulation_form').SimulationForm;

let AppInit = (root) => {

    m.route(root, "/",
        {
            "/": Home,
            "/load_simulation": SimulationForm
        }
    );
};


module.exports = {
    lib_sim,
    algorithms,
    // batch,
    scheduler,
    sched,
    simulation,
    AppInit
}
