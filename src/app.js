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

let AppInit = (root) => {

    let Home = {
        view: () => {
            return m('div', [
                m('a', {href: '#!/load_simulation'}, 'cargar simulacion')
            ]);
        }
    };

    var lot_thingy = {
        unparsed: '',
        parse: () => LotParser(lot_thingy.unparsed)
    };

    let SimulationForm = {
        view: (ctrl) => {
            return m('div', [
                m('form', [
                    m('.form-group', [
                        m('label', {for: 'lot'}, 'Ingrese requerimientos para el lote'),
                        m('input#lot.form-control', {
                            type: 'text',
                            name: 'lot',
                            oninput: m.withAttr('value', (value) => lot_thingy.unparsed = value),
                            value: lot_thingy.unparsed
                        }),
                        m('hr'),
                        m('.actions.text-right', [
                            m('button.btn.btn-default[type=submit]', {onclick: () => {
                                console.log(lot_thingy.parse());
                                return false;
                            }
                            }, 'cargar lote')
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
