const m = require('mithril')

var batchWidget = require('../widgets/batch').batchWidget;
var lotInputWidget = require('../widgets/lot').lotInputWidget;
var hddWidget = require('../widgets/hdd').hddWidget;
var algorithmsWidget = require('../widgets/algorithms').algorithmsWidget;
var simulationWidget = require('../widgets/simulation').simulationWidget;
// lib
var Lot = require('../simulation').Lot;
var Batch = require('../simulation').LotsBatch;
var Sim = require('../simulation').Simulation;
var algorithms = require('../algorithms');
var Scheduler = require('../scheduler').Scheduler;
// models
var hdd = require('../models/hdd').hdd;
var algorithm = require('../models/algorithm').algorithm;
var simulation = require('../models/simulation').simulation;



var batch = new Batch();

var lot = require('../widgets/lot').lot;


let SimulationForm = {
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
          m(algorithmsWidget),
          m('hr'),
          m('.actions.text-right', [
            m('button.btn.btn-default[type=button]', {
              onclick: () => {
                let h = hdd;
                let b = new Batch([
                  {lot: lot.parse(),
                   movementsUntilNextLot: 0}
                  ]);
                let s = new Sim({
                  direction: simulation.direction,
                  position: simulation.position,
                  hdd: h,
                  lotsBatch: b
                });
                // let a = eval("new algorithms." + algorithm.algorithm + "()");
                let a = eval("algorithms."+algorithm.algorithm);
                let scheduler = new Scheduler(a,s);
                console.log(scheduler.run());
                // let b = batch
                // console.log(lot_thingy.parse());
                // batch.lots = lot.parse();
                // console.log(simulation);
                // return false;
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


module.exports={
  SimulationForm,
}
