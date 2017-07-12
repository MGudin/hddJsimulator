import {
    algorithmButtons,
    simulationInfo,
    chartComponent,
} from './partials';

import {simulation,
        scheduler,
        algorithm,
        chartModel,
       } from '../models';

var Chart = {
    oninit: (vnode) => {
        this.simulation = simulation.construct();
        this.chart = chartModel;
    },
    onupdate:(vnode) => {

    },
    view: (vnode) => {
        return [
            m('.row',[
                m(simulationInfo, {simulation: this.simulation,
                                   chart: this.chart
                                  })
            ]), // closes first row
            m('.row',[
                m(algorithmButtons)
            ]),
            m('.row',[
                m('.chart-wrapper', [
                    m(chartComponent, {results: scheduler.construct().run()})
                ])
            ]),

            m('.row',[
                m('.actions', [
                    m('a', {href: '#!/load_simulation'}, 'back')
                ])
            ])
        ]
    }
}

export default Chart
