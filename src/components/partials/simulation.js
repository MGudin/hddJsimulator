import {simulation} from '../../models';


let simulationForm = {
    oninit: (vnode) => {
        this.right = "checked";
        this.left = "";
    },
    radioImputClick: (value) => {
        simulation.toggleDirection(value);
        this.right = !this.right;
        this.left = !this.left;
    },
    view: vnode => {
        return m('.form-group', [
            m('h3', 'Estado inicial'),
            m('label',
                { for: ''},
                "Direccion inicial"),
            m("br"),
            m('.radio-inline', [
                m('label', [
                    m('input',
                        { type: "radio",
                            name: "direction",
                            value: "false",
                          onclick: m.withAttr('value', simulationForm.radioImputClick),
                          checked: this.left
                        }
                    ),// closes input
                    m('span.glyphicon.glyphicon-circle-arrow-left')
                ])
            ]), // closes .radio
            m('.radio-inline', [
                m('label', [
                    m('input',
                        { type: "radio",
                          name: "direction",
                          value: "true",
                          onclick:  m.withAttr('value', simulationForm.radioImputClick),
                          checked: this.right
                        }
                    ),// closes input
                    m('span.glyphicon.glyphicon-circle-arrow-right')
                ])
            ]), // closes .radio
            m('br'),
            m('label', { for: 'position' }, 'Posicion'),
            m('input.form-control', {
                type: "number",
                name: "position",
                value: simulation.position,
                oninput: m.withAttr('value', simulation.setPosition)
            })
        ])// closes form-group
    }
}

export default simulationForm;
