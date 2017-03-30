var m = require('mithril')

var lotInputForm = require('./lot').lotInputForm;

var batchModel = {
  batch:[m(lotInputForm)],
  addLot: (lotInput) => {
    // console.log(batchModel.batch);
    batchModel.batch.push(lotInput);
  }
}


var batchForm = {
  oninit: (vnode) => {
    vnode.attrs.lotInput = m(lotInputForm)
  },
  view: (vnode) => {
    return m(".form-group",[
      m("h3", "Lotes"),
      m("#lotes", batchModel.batch),
      // m("p.btn.btn-default", 
      //   {
          // lotInput: "un lote",
          // lotInput: m(lotInputForm),
          // onclick: () => {m.withAttr('lotInput', batchModel.addLot); m.redraw()}
          // onclick: () => {vnode.children.push(m(lotInputForm)); console.log(vnode); vnode.children.map(()=>{m.redraw()})}
        // })
      //   "agregar lote")
    ])
  }
}

module.exports={
  batchForm,
}
