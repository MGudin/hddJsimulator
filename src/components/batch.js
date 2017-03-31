import lotInputForm from './lot';

let batchModel = {
    batch:[m(lotInputForm)],
    addLot: lotInput => {
        // console.log(batchModel.batch);
        batchModel.batch.push(lotInput);
    }
}


let batchForm = {
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

export default batchForm;
