// specifications/PayoutSpecification.ts

import { Milestone } from '@prisma/client';
import { ISpecification } from './common'; // Import the ISpecification 
// export interface Specification {
//     isSatisfiedBy(milestone: Milestone): boolean;
// }

export const PayoutSpecification: Specification = {
    isSatisfiedBy: (milestone) => {
        return milestone.status === 'completed';
    },
};

interface

// Define a specification for checking if the milestone amount is greater than a threshold.
class MilestoneAmountGreaterThanThreshold implements ISpecification {
  private threshold: number;

  constructor(threshold: number) {
    this.threshold = threshold;
  }

  isSatisfiedBy(candidate: unknown): boolean {
    // Candidate should be a milestone object with an 'amount' property.
    if (typeof candidate === 'object' && candidate !== null && 'amount' in candidate) {
      const milestoneAmount = candidate.amount;
      return milestoneAmount > this.threshold;
    }
    return false;
  }

  // Implement other methods (and, andNot, or, orNot, not) as needed.
}

// Define a specification for checking if the project status allows payouts.
class ProjectStatusAllowsPayout implements ISpecification {
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
