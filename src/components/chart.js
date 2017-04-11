var Chart = require('chart.js');

var chartModel = {

    data: [
        {
            x: -10,
            y: 10
        }, {
            x: 20,
            y: 5
        }, {
            x: 0,
            y: 0
        }],

    addPoint:(coor) => {
        chartModel.data.push(coor);
    },

    construct: (vnode) => {
        return new Chart(vnode.instance.dom,
                         {
                             type: 'line',
                             data: {
                                 datasets:[
                                     {
                                         data: chartModel.data

                                     }]
                             },

                             options: {
                                 scales: {
                                     xAxes: [{
                                         ticks: {
                                             max: 511,
                                             min: 0,
                                             step: 10
                                         },
                                         type: 'linear',
                                         position: 'bottom'
                                     }]
                                 }
                             }
                         });


    }
}

var chartComponent = {
    oncreate: (vnode) => {
        var c = chartModel.construct(vnode);
    },
    view: (vnode) => {
        return [m('canvas[width=400][height=400]'),
                m('a.btn.btn-default',{
                    onclick: (e) => {
                        e.preventDefault();
                        chartModel.addPoint({x:-5, y:-10});
                        console.log(chartModel.data);
                        chartModel.construct(vnode);
                    }
                }, "agregar punto")
               ]
    }
}

export default chartComponent
