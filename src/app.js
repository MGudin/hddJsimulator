'use strict';

var m, simulation, lot_thingy;

document.addEventListener("DOMContentLoaded", function(event) {

    m = libhdd.m;
    let root = document.querySelector('#app-root')

    simulation = new libhdd.Simulation();

    let Home = {
        view: () => {
            return m('div', [
                m('a', {href: '#!/load_simulation'}, 'cargar simulacion')
            ]);
        }
    };

    lot_thingy = {
        unparsed: '',
        parse: () => {
            return libhdd.LotParser(lot_thingy.unparsed);
        }
    };

    let parse_lot_thingy = (event) => {
        event.preventDefault();
        console.log(lot_thingy.parse());
        return false;
    }

    let SimulationForm = {
        view: (vnode) => {
          console.log(vnode);
            return m('div', [
                m('form', {onsubmit: parse_lot_thingy},
                    [
                        m('.form-group', [
                            m('label', {for: 'name'}, 'ingrese el nombre para la simulacion'),
                            m('input#name.form-control', {
                                type: 'text',
                                name: 'name',
                                oninput: m.withAttr('value', value => simulation.name = value),
                                value: simulation.name
                            }),
                            m('label', {for: 'hdd-max-tracks'}, 'ingrese cantidad de pistas del hdd'),
                            m('input#hdd-max-tracks.form-control', {
                                type: 'number',
                                name: 'hdd-max-tracks',
                                oninput: m.withAttr('value', value => simulation.hdd.tracks = value),
                                value: simulation.hdd.tracks
                            }),
                            m('label', {for: 'lot'}, 'Ingrese requerimientos para el lote'),
                            m('input#lot.form-control', {
                                type: 'text',
                                name: 'lot',
                                oninput: m.withAttr('value', value => lot_thingy.unparsed = value),
                                value: lot_thingy.unparsed
                            }),
                            m('hr'),
                            m('.actions.text-right', [
                                m('button.btn.btn-dark[type=submit]', {onclick: parse_lot_thingy},  'cargar lote')
                            ])
                        ])
                    ]),
                m('.actions', [
                    m('a', {href: '#!/'}, 'back')
                ])
            ]);
        }
    }

    m.route(root, "/",
        {
            "/": Home,
            "/load_simulation": SimulationForm
        }
    );
});
