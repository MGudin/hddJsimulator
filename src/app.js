'use strict';

var m, simulation, lot_thingy;

document.addEventListener("DOMContentLoaded", function(event) {

    m = libhdd.m;
    let root = document.querySelector('#app-root')

    simulation = new libhdd.Simulation();


    m.route(root, "/",
        {
            "/": libhdd.layouts.Home,
            "/load_simulation": libhdd.layouts.SimulationForm
        }
    );
});
