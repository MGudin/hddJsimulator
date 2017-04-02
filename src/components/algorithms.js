import algorithm from '../models/algorithm';
import scheduler from '../models/scheduler';

var s;

var buttonWidget = {
  view: (vnode) => {
    return m('button.btn.btn-default',
             {  type: "button",
                // name: "algorithm",
                value: vnode.attrs.value,
                // onclick: m.withAttr('value', algorithm.setAlgorithm)
                onmousedown: () => {
                  algorithm.setAlgorithm(vnode.attrs.value);
                  s = scheduler.construct();
                },
                onmouseup: () => {
                  console.log(s.run());
                }
             },
             vnode.attrs.label)
  }
}

var algorithmButtons = {
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

export default algorithmButtons;
