import {scheduler, chartModel} from '../../models';


var chartComponent = {
    oncreate:(vnode) => {
        this.canvas = vnode.instance.dom;
    },
    onupdate: (vnode) => {
        chartModel.stepsToData(vnode.attrs.results);
        chartModel.construct(this.canvas);
    },
    view: (vnode) => {
        return m('canvas[width=400][height=400]');
    }
}

export default chartComponent
