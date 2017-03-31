'use strict';

import CLOOK from './clook';
import Requirement from '../requirement';
import Edge from '../edge';

class CSCAN extends CLOOK
{
    className()
    {
        return 'CSCAN';
    }

    static getNextRequirement(context)
    {
        let [greater, smaller] = this.splitRequirements(
            context.unattended.requirements,
            context.position
        );

        let dir = context.originalDir ? context.originalDir : context.direction;
        let lastReq = context.attended.at(context.attended.size() - 1);
        let nextReq;

        if (dir) {
            if (greater.isEmpty()) {
                if (lastReq.value === context.maxTracks)
                {
                    nextReq = new Edge(0);
                } else {
                    nextReq = new Requirement(context.maxTracks);
                }
            } else {
                nextReq = greater.closest(context.position);
            }
        } else {
            if (smaller.isEmpty()) {
                if (lastReq.value === 0)
                {
                    nextReq = new Edge(context.maxTracks);
                } else {
                    nextReq = new Requirement(0);
                }
            } else {
                nextReq = smaller.closest(context.position);
            }
        }
        return nextReq;
    }
}

export default CSCAN;
