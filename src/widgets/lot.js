var m = require('mithril')
var lot = require('../models/lot').lot;

var lotInputWidget = {
  view: () => {
    return [
      m('label',
        {for: 'lot'},
        'Ingrese requerimientos para el lote n'),
      m('input.form-control', {
        id:'lot',
        type: 'text',
        name: 'lot',
        oninput: m.withAttr('value', lot.setUnparsed),
        value: lot.unparsed
      })]
  }
}

module.exports={
  lotInputWidget,
  lot,
}
