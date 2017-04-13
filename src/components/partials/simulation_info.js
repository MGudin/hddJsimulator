var simulationInfo = {
    oninit: (vnode) => {
        this.simulation = vnode.attrs.simulation
    },
    view: (vnode) => {
        return [
            m(".col-md-4",[
                m(".panel.panel-default.info-panel",[
                    m('.panel-heading',
                      m('h5.panel-title',"simulacion")
                     ),
                    m('.panel-body',[
                        m('p', "Hdd:"+this.simulation.hdd.tracks),
                        m('p', "Direccion Inicial:"+((this.simulation.direction)?"derecha":"izquierda")),
                        m('p', "Posicion inicial:"+this.simulation.position),
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

export default simulationInfo;
