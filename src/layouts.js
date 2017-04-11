import {
    algorithmButtons,
    hddForm,
    simulationForm,
    batchForm,
  lotInputForm,
    simulationInfo,
    chartComponent,
} from './components';

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
            ]),
            m('.row',[
                m(chartComponent)
            ])
        ]
    }
}

export {
  SimulationForm,
  Home,
  Chart,
}
