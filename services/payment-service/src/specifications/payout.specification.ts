// specifications/PayoutSpecification.ts

import { Milestone } from '@prisma/client';

export interface Specification {
    isSatisfiedBy(milestone: Milestone): boolean;
}

export const PayoutSpecification: Specification = {
    isSatisfiedBy: (milestone) => {
        return milestone.status === 'completed';
    },
};
