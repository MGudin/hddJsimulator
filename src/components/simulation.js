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
    },
    onupdate:(vnode) => {
    },
    view: (vnode) => {
        return [
            m('.row',[
                m(simulationInfo, {simulation: simulation.construct(),
                                   chart: chartModel
                                  })
            ]), // closes first row
            m('.row',[
                m(algorithmButtons)
            ]),
            m('.row',[
                m('.chart-wrapper', [
                    m(chartComponent, {
                        results: scheduler.construct().run(),
                        initialPosition: simulation.position
                    })
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
