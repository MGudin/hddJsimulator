var m = require('mithril');

var simulationInfo = {
    view: (vnode) => {
        return [
            m(".col-md-4",[
                m(".panel.panel-default.info-panel",[
                    m('.panel-heading',
                      m('h5.panel-title',"simulacion")
                     ),
                    m('.panel-body',[
                        m('p', "Hdd: 521 tracks"),
                        m('p', "Direccion Inicial: derecha"),
                        m('p', "Posicion inicial: 40"),
                    ])
                ])// closes panel
            ]), // first col
            m('.col-md-4',[
                m(".panel.panel-default.info-panel",[
                    m('.panel-heading',
                      m('h5.panel-title',"Paso")
                     ),
                    m('.panel-body',[
                        m('p', "Requerimiento: 45"),
                        m('p', "Direccion final: derecha"),
                        m('p', "movimientos: 40"),
                    ])
                ])// closes panel

            ]), //second col
            m('.col-md-4', [
                m('p', 'sarasa')
            ]) // third col
        ]
    }
}

module.exports = simulationInfo
