var m = require('mithril');
var simulation = require('../models/simulation').simulation;

var simulationWidget = {
  view: (vnode) => {
    return m('.form-group', [
      m('h3', 'Estado inicial'),
      m('label',
        { for: 'direction'},
        "Direccion inicial derecha"),
      m('input.form-control',
        { type: "checkbox",
          name: 'direction',
          value: simulation.direction,
          onchange: simulation.toggleDirection
        }),

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
