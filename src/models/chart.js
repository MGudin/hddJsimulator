var Chart = require('chart.js');

var chartModel = {
    index: -1,

    data:[],

    addPoint:(coor) => {
        chartModel.data.push(coor);
    },

    stepsToData:(steps) => {
        chartModel.data = [];
        steps.forEach((step, index) => {
            console.log(index);
            chartModel.addPoint({x: step.requirement.value, y: - index*2});
        });
    },

    construct: (vnode) => {
        return new Chart(vnode,
                         {
                             type: 'line',
                             data: {
                                 datasets:[
                                     {data: chartModel.data,
                                      lineTension:0,
                                      fill: false
                                     }
                                 ]
                             },
                             legend: {
                                 enabled: false,
                                 align: "left"
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
                                 },
                                 legend:{
                                     display: false
                                 },
                             }
                         });


    }
}

export default chartModel;
