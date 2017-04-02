import {Scheduler, algorithms} from '../libhdd';
import algorithm from './algorithm';
import simulation from './simulation';

var scheduler = {
  FCFS: algorithms.FCFS,
  SSTF: algorithms.SSTF,
  LOOK: algorithms.LOOK,
  CLOOK: algorithms.CLOOK,
  SCAN: algorithms.SCAN,
  CSCAN: algorithms.CSCAN,
  
  construct: () => {
    return new Scheduler(scheduler[algorithm.algorithm], simulation.construct());
  }
}

export default scheduler;
