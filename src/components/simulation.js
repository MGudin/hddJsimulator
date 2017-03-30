var m = require('mithril');
var simulation = require('../models/simulation').simulation;

var simulationWidget = {
  oninit: (vnode) => {
    vnode.attrs.right = "checked";
  },

  view: (vnode) => {
    return m('.form-group', [
      m('h3', 'Estado inicial'),
      m('label',
        { for: ''},
        "Direccion inicial"),
      m("br"),
      m('.radio-inline',
        m('label',[
          m('input',
            { type: "radio",
              name: "direction",
              value: "false",
              onclick:  m.withAttr('value', simulation.toggleDirection)}
           ),// closes input
          m('span.glyphicon.glyphicon-circle-arrow-left'),
        ]),
       ), // closes .radio
      m('.radio-inline',
        m('label',[
          m('input',
            { type: "radio",
              name: "direction",
              value: "true",
              checked: vnode.attrs.right,
              onclick: m.withAttr('value', simulation.toggleDirection)},
           ),// closes input
          m('span.glyphicon.glyphicon-circle-arrow-right')
        ]),
       ), // closes .radio
      m('br'),
      m('label',
        { for: 'position' },
        'Posicion'),
      m('input.form-control',
        { type: "number",
          name: "position",
          value: simulation.position,
          oninput: m.withAttr('value', simulation.setPosition)
        })
      
    ])// closes form-group
  }
}

module.exports = {
  simulationWidget,
}
