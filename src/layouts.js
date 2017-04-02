const m = require('mithril')

var batchForm = require('./components/batch').batchForm;
var lotInputForm = require('./components/lot').lotInputForm;
var hddForm = require('./components/hdd').hddForm;
var algorithmButtons = require('./components/algorithms').algorithmButtons;
var simulationForm = require('./components/simulation').simulationForm;

var simulationInfo = require('./components/simulation_info');
// lib
// var algorithms = require('./algorithms');
// var Scheduler = require('./scheduler');

// models
// var simulation = require('./models/simulation').simulation;
// var scheduler = require('./models/scheduler');
// var scheduler;

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
      m('',[
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
          m('hr'),
          m('.actions.text-right', [
            m('a.btn.btn-default', {
              href: "#!/simulacion"
              // onclick: () => {
              //   var sim = simulation.construct();
              //   var a = eval("algorithms."+algorithm.algorithm);
              //   // var s = new Scheduler(a,sim);
              //   var schedulerr = scheduler.construct();
              //   console.log(schedulerr.run());
              // }
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
    return [
      m('.row',[
        m(simulationInfo)
      ]), // closes first row
      m('.row',[
        m(algorithmButtons)
      ])
    ]      
  }
}
module.exports = {
  SimulationForm,
  Home,
  Chart,
}
