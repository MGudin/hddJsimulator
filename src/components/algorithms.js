import algorithm from '../models/algorithm';

let radioInputWidget = {

    view: (vnode) => {

        return m('.radio-inline', [
            m('label', [
                m('input',
                    { type: "radio",
                        name: "algorithm",
                        value: vnode.attrs.value,
                        onclick: m.withAttr('value', algorithm.setAlgorithm)
                    }),// closes input
                vnode.attrs.label
            ])
        ]
        ) // closes .radio
    }
}

let algorithmsForm = {
    view: (vnode) => {
        return [
            m('.form-group', [
                m('h3', 'Algoritmo'),
                m('div', [
                    m(radioInputWidget, {value: "FCFS", label: "FCFS"}),
                    m(radioInputWidget, {value: "SSTF", label: "SSTF"}),
                    m(radioInputWidget, {value: "SCAN", label: "SCAN"}),
                    m(radioInputWidget, {value: "CSCAN", label: "CSCAN"}),
                    m(radioInputWidget, {value: "LOOK", label: "LOOK"}),
                    m(radioInputWidget, {value: "CLOOK", label: "CLOOK"})
                ])
            ])
        ]
    }
}

export {
    algorithmsForm,
    algorithm,
}
