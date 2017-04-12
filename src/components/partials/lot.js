import {lot} from '../../models';

let lotInputForm = {
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

export default lotInputForm;
