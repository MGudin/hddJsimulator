const m = require('mithril')

var batchForm = require('./components/batch').batchForm;
var lotInputForm = require('./components/lot').lotInputForm;
var hddForm = require('./components/hdd').hddForm;
var algorithmButtons = require('./components/algorithms').algorithmButtons;
var simulationForm = require('./components/simulation').simulationForm;

// lib
var Lot = require('./simulation').Lot;
var Batch = require('./simulation').LotsBatch;
var Sim = require('./simulation').Simulation;
var Hdd = require('./simulation').Hdd;
var algorithms = require('./algorithms');
var Scheduler = require('./scheduler').Scheduler;

// models
var hdd = require('./models/hdd').hdd;
var algorithm = require('./models/algorithm').algorithm;
var simulation = require('./models/simulation').simulation;
var lot = require('./models/lot').lot;

var scheduler;

var Home = {
  view: () => {
    return m('div', [
      m('a', {href: '#!/load_simulation'}, 'cargar simulacion')
    ]);
  }
};


var SimulationForm = {
  view: (ctrl) => {
    return m('div', [
      m('form', [
        m('.row',[
          m('.col-md-6', [
            m(hddForm)
          ]),
          m('.col-md-6', [
            m(simulationForm),
          ])
        ]), // closes row 1
        m('.row', [
          m(batchForm),
          // m(algorithmsWidget),
          m('hr'),
          m('.actions.text-right', [
            m('button.btn.btn-default[type=button]', {
              onclick: () => {
                var h = new Hdd(hdd);
                var b = new Batch([
                  {lot: lot.parse(),
                   movementsUntilNextLot: 0}
                ]);
                var s = new Sim({
                  direction: simulation.direction,
                  position: simulation.position,
                  hdd: h,
                  lotsBatch: b
                });
                var a = eval("algorithms."+algorithm.algorithm);
                var s = new Scheduler(a,s);
                var scheduler = s;
                console.log(scheduler.run());
              }
            }, 'simular')
          ]),
        ]) // close row 2
      ]),// closes form
      
      m('.actions', [
        m('a', {href: '#!/'}, 'back')
      ])
    ])// closes div
  }
}

var Chart = {
  view: () => {
    return m('', m(algorithmButtons))
  }
}
module.exports = {
  SimulationForm,
  Home,
  Chart,
}
