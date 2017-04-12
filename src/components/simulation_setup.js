import {
    hddForm,
    simulationForm,
    batchForm,
    lotInputForm
} from './partials';


var SimulationSetUp = {
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

export default SimulationSetUp
