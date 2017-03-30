const m = require('mithril')

var batchWidget = require('./components/batch').batchWidget;
var lotInputWidget = require('./components/lot').lotInputWidget;
var hddWidget = require('./components/hdd').hddWidget;
var algorithmsWidget = require('./components/algorithms').algorithmsWidget;
var simulationWidget = require('./components/simulation').simulationWidget;

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
            m(hddWidget)
          ]),
          m('.col-md-6', [
            m(simulationWidget),
          ])
        ]), // closes row 1
        m('.row', [
          m(batchWidget),
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
                var scheduler = new Scheduler(a,s);
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

module.exports = {
  SimulationForm,
  Home,
}
