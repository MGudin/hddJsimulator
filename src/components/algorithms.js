var m = require('mithril');

var algorithm = require('../models/algorithm').algorithm;

var buttonWidget = {

  
  view: (vnode) => {

    return m('button.btn.btn-default',
             {  type: "button",
                // name: "algorithm",
                value: vnode.attrs.value,
                // onclick: m.withAttr('value', algorithm.setAlgorithm)
                onclick: () => {
                  algorithm.setAlgorithm(vnode.attrs.value);
                  console.log(algorithm.algorithm);
                }
             },
             vnode.attrs.label)
  }
}

var algorithmButtons = {
  onupdate: () => {
    console.log(algorithm);
  },
  view: (vnode) => {
    return [
      m('.form-group',[
        m('h3', 'Algoritmos'),
        m('div',[
          m(buttonWidget, {value: "FCFS", label: "FCFS"}),
          m(buttonWidget, {value: "SSTF", label: "SSTF"}),
          m(buttonWidget, {value: "SCAN", label: "SCAN"}),
          m(buttonWidget, {value: "CSCAN", label: "CSCAN"}),
          m(buttonWidget, {value: "LOOK", label: "LOOK"}),
          m(buttonWidget, {value: "CLOOK", label: "CLOOK"})
        ])
      ])
    ]
  }
}

module.exports = {
  algorithmButtons,
}
