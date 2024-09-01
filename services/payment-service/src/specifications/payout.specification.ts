// specifications/PayoutSpecification.ts

import { Milestone } from '@prisma/client';
import Specification from './common'; // Import the ISpecification 
// export interface Specification {
//     isSatisfiedBy(milestone: Milestone): boolean;
// }

export class PayoutSpecification extends Specification<Milestone> {
    constructor(
        // private threshold: number
    ) {
        super();
    }
    isSatisfiedBy(milestone: Milestone): boolean {
        return milestone.status === 'completed';
    }
};


// Define a specification for checking if the milestone amount is greater than a threshold.
export class MilestoneAmountGreaterThanThreshold extends Specification<unknown> {
    private threshold: number;

    constructor(threshold: number) {
        super();
        this.threshold = threshold;
    }

    isSatisfiedBy(candidate: unknown): boolean {
        // Candidate should be a milestone object with an 'amount' property.
        if (typeof candidate === 'object' && candidate !== null && 'amount' in candidate) {
            const milestoneAmount = Number(candidate.amount);
            return milestoneAmount > this.threshold;
        }
        return false;
    }

    // Implement other methods (and, andNot, or, orNot, not) as needed.
}

// Define a specification for checking if the project status allows payouts.
export class ProjectStatusAllowsPayout extends Specification<unknown> {
    constructor() {
        super();
    }
    isSatisfiedBy(candidate: unknown): boolean {
        // Candidate should be a project object with a 'status' property.
        if (typeof candidate === 'object' && candidate !== null && 'status' in candidate) {
            const projectStatus = candidate.status;
            // Implement your logic to check if the status allows payouts.
            // For example, return true if the status is 'Active'.
            return projectStatus === 'Active';
        }
        return false;
    }

    // Implement other methods (and, andNot, or, orNot, not) as needed.
}
