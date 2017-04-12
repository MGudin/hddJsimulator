import {hdd} from '../../models';

let hddForm = {
    view : (vnode) => {
        return [
            m(".form-group", [
                m("h3","HDD"),
                // m("label",
                //   {for: "hdd-name"},
                //   "ingrese el nombre para el disco"),
                // m("input.form-control",
                //   { id: "hdd-name",
                //     type: "text",
                //     oninput: m.withAttr("value", (value) => hdd.name = value),
                //     value: hdd.name
                //   }),
                m("label",
                    {for: "hdd-tracks"},
                    "ingrese la cantidad de pistas"),
                m("input.form-control",
                    { id: "hdd-tracks",
                        type: "number",
                        value: hdd.tracks,
                      oninput: m.withAttr("value", hdd.setTracks)}
                )
            ])
        ]
    }
}


export default hddForm;
