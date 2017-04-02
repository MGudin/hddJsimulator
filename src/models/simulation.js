import {Simulation} from '../libhdd';
import hdd from './hdd';
import batch from './batch';
import lot from './lot';

let simulation = {
    position: 0,
    direction: true,
    toggleDirection: () => {
        simulation.direction = !simulation.direction
    },
    setPosition: position => {
        simulation.position = Number(position)
    },
  construct: () => {
    batch.lots = [{lot: lot.parse(), movementsUntilNextLot: 0}];
    return  new Simulation({
      direction: simulation.direction,
      position: simulation.position,
      hdd: hdd.construct(),
      lotsBatch: batch.construct()
    })
  }
}

export default simulation;
