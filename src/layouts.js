// import {
//     batchForm,
//     // lotInputForm,
//     // hddForm,
//     // algorithmsForm,
//     // simulationForm,
// } from './components';

// // lib
// im
// Lot
// Batch
// Sim
// Hdd
// algorithms
// Scheduler

// // models
// hdd
// algorithm
// simulation
// lot

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
//       m('form', [
//         m('.row',[
//           m('.col-md-6', [
//             m(hddForm)
//           ]),
//           m('.col-md-6', [
//             m(simulationForm),
//           ])
//         ]), // closes row 1
//         m('.row', [
//           m(batchForm),
//           // m(algorithmsWidget),
//           m('hr'),
//           m('.actions.text-right', [
//             m('button.btn.btn-default[type=button]', {
//               onclick: () => {
//                 var h = new Hdd(hdd);
//                 var b = new Batch([
//                   {lot: lot.parse(),
//                    movementsUntilNextLot: 0}
//                 ]);
//                 var s = new Sim({
//                   direction: simulation.direction,
//                   position: simulation.position,
//                   hdd: h,
//                   lotsBatch: b
//                 });
//                 var a = eval("algorithms."+algorithm.algorithm);
//                 var scheduler = new Scheduler(a,s);
//                 console.log(scheduler.run());
//               }
//             }, 'simular')
//           ]),
//         ]) // close row 2
//       ]),// closes form
//
      m('.actions', [
        m('a', {href: '#!/'}, 'back')
      ])
    ])// closes div
  }
}

export  {
    SimulationForm,
    Home,
}
