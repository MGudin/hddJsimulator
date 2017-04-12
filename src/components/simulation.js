import {
    algorithmButtons,
    simulationInfo,
    chartComponent,
} from './partials';

import {simulation, scheduler, algorithm} from '../models';

var Chart = {
    oninit: (vnode) => {
        this.simulation = simulation.construct();
    },
    onupdate:(vnode) => {

    },
    view: (vnode) => {
        return [
            m('.row',[
                m(simulationInfo, {simulation: this.simulation})
            ]), // closes first row
            m('.row',[
                m(algorithmButtons)
            ]),
            m('.row',[
                m(chartComponent, {results: scheduler.construct().run()})
            ])
        ]
    }
}

export default Chart
