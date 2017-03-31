'use strict';

var sim = new libhdd.Simulation();
var simulation, lot_thingy;

document.addEventListener("DOMContentLoaded", function(event) {

    let root = document.querySelector('#app-root')

    simulation = new libhdd.Simulation();

    m.route(root, "/",
        {
            "/": libhdd.layouts.Home,
            "/load_simulation": libhdd.layouts.SimulationForm
        }
    );
});
