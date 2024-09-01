// services/MilestoneService.ts

import prisma from '../utils/prisma';

export const MilestoneService = {
    getMilestonesForProject: (projectId: number) => {
        return prisma.milestone.findMany({
            where: {
                projectId,
            },
        });
    },
};