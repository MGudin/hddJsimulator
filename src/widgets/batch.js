var m = require('mithril')

var lotInputWidget = require('./lot').lotInputWidget;

var batchModel = {
  batch:[m(lotInputWidget)],
  addLot: (lotInput) => {
    // console.log(batchModel.batch);
    batchModel.batch.push(lotInput);
  }
}


var batchWidget = {
  oninit: (vnode) => {
    vnode.attrs.lotInput = m(lotInputWidget)
  },
  view: (vnode) => {
    return m(".form-group",[
      m("h3", "Lotes"),
      m("#lotes", batchModel.batch),
      // m("p.btn.btn-default", 
      //   {
          // lotInput: "un lote",
          // lotInput: m(lotInputWidget),
          // onclick: () => {m.withAttr('lotInput', batchModel.addLot); m.redraw()}
          // onclick: () => {vnode.children.push(m(lotInputWidget)); console.log(vnode); vnode.children.map(()=>{m.redraw()})}
        // })
      //   "agregar lote")
    ])
  }
}

module.exports={
  batchWidget,
}
