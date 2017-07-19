import {algorithm,scheduler} from '../../models';

var buttonWidget = {
    onclickHandler: (value) => {
        algorithm.setAlgorithm(value);
    },
    view: (vnode) => {
        return m('button.btn.btn-default',
                 {  type: "button",
                    value: vnode.attrs.value,
                    onclick: m.withAttr('value', buttonWidget.onclickHandler)
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
