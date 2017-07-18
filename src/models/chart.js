var Chart = require('chart.js');

var chartModel = {
    // TODO: set y coordinate according to lenght
    // of data

    index: -1,

    data:[],

    addPoint:(xCoor, yCoor, kwargs) => {
        let coor = {
            x: xCoor,
            y: yCoor
        };
        Object.assign(coor, kwargs);
        chartModel.data.push(coor);
    },

    stepsToData:(initialPosition, steps) => {
        chartModel.data = [];

        // add initial point to data
        chartModel.addPoint(initialPosition,0,{movements:0, isPF:false});

        steps.forEach((step, index) => {

            chartModel.addPoint(
                step.requirement.value,
                    -index-1,
                {
                    movements:step.movements,
                    isPF: step.requirement.isPageFault
                }
            );
        });
    },

    construct: (vnode) => {
        return new Chart(vnode,
                         {
                             type: 'line',
                             data: {
                                 datasets:[
                                     {
                                         data: chartModel.data,
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
                                     }],
                                     yAxes: [{
                                         ticks: {
                                             callback: function(value, index, values){
                                                 return '';
                                             }
                                         }
                                     }]
                                 },
                                 legend:{
                                     display: false
                                 },
                                 tooltips: {
                                     displayColors: false,
                                     callbacks: {
                                         title: function(tooltipItem, chart){
                                             return "contexto";
                                         },
                                         label: function(tooltipItem, data){
                                             return [
                                                 "requerimiento: " + tooltipItem.xLabel,
                                                 "movimientos: " + data.datasets[0].data[tooltipItem.index].movements,
                                                 "Tipo: " + ((data.datasets[0].data[tooltipItem.index].isPF)? "Page Fault": "Regular")
                                             ];
                                         }
                                     }
                                 },
                             }
                         });


    }
}

export default chartModel;
